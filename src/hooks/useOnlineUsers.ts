import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

interface OnlineUser {
  user_id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export const useOnlineUsers = (channelName: string) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    if (!user || !profile) return;

    const channel = supabase.channel(channelName);

    const updateOnlineUsers = async () => {
      const state = channel.presenceState();
      const userIds = Object.values(state).flat().map((presence: any) => presence.user_id);
      
      if (userIds.length === 0) {
        setOnlineUsers([]);
        return;
      }

      // Fetch profile information for all online users
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name, username')
        .in('user_id', userIds);

      if (profiles) {
        setOnlineUsers(profiles);
      }
    };

    channel
      .on('presence', { event: 'sync' }, updateOnlineUsers)
      .on('presence', { event: 'join' }, updateOnlineUsers)
      .on('presence', { event: 'leave' }, updateOnlineUsers)
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            username: profile.username,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [user, profile, channelName]);

  return { 
    onlineUsers, 
    onlineCount: onlineUsers.length 
  };
};
