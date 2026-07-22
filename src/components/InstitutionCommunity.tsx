import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, MessageCircle, Send, Trash2, ChevronLeft, Crown } from "lucide-react";

export interface InstitutionCommunityHandle {
  openCreate: () => void;
}

interface InstitutionCommunityProps {
  userId: string;
  registrationType?: string | null;
  profile?: {
    first_name?: string;
    last_name?: string;
    username?: string;
    institution?: string;
  } | null;
}

interface Community {
  id: string;
  name: string;
  institution_name: string | null;
  created_by: string;
  created_at: string;
  role?: "admin" | "member";
  creator_name?: string;
}

interface CommunityMessage {
  id: string;
  community_id: string;
  user_id: string;
  message: string;
  created_at: string;
  username?: string;
}

export const InstitutionCommunity = forwardRef<InstitutionCommunityHandle, InstitutionCommunityProps>(
  ({ userId, registrationType, profile }, ref) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityInstitution, setNewCommunityInstitution] = useState(profile?.institution || "");
  const [newMessage, setNewMessage] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "chat">("list");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const isEcdManager = registrationType === "ecd-manager";
  const canCreateCommunity = registrationType === "ecd-manager" || registrationType === "parent";

  useImperativeHandle(ref, () => ({
    openCreate: () => setCreateOpen(true),
  }));

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from("institution_communities")
        .select("*, community_members(role)")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formatted: Community[] = (data || []).map((c: any) => ({
        id: c.id,
        name: c.name,
        institution_name: c.institution_name,
        created_by: c.created_by,
        created_at: c.created_at,
        role: c.community_members?.[0]?.role || "member",
        creator_name: c.created_by === userId ? "You" : "Member",
      }));

      setCommunities(formatted);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  const fetchMessages = async (communityId: string) => {
    try {
      const { data, error } = await supabase
        .from("community_messages")
        .select("*")
        .eq("community_id", communityId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const userIds = [...new Set((data || []).map((m: any) => m.user_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, username, first_name, last_name")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profilesData || []).map((p: any) => [
          p.user_id,
          p.username || `${p.first_name || ""} ${p.last_name || ""}`.trim() || "Anonymous",
        ])
      );

      const formatted: CommunityMessage[] = (data || []).map((m: any) => ({
        id: m.id,
        community_id: m.community_id,
        user_id: m.user_id,
        message: m.message,
        created_at: m.created_at,
        username: profileMap.get(m.user_id) || "Anonymous",
      }));

      setMessages(formatted);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (!selectedCommunity) return;

    fetchMessages(selectedCommunity.id);

    const channel = supabase
      .channel(`community-messages-${selectedCommunity.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_messages",
          filter: `community_id=eq.${selectedCommunity.id}`,
        },
        (payload) => {
          const newMsg = payload.new as any;
          if (newMsg.user_id === userId) {
            fetchMessages(selectedCommunity.id);
            return;
          }
          setMessages((prev) => [
            ...prev,
            {
              id: newMsg.id,
              community_id: newMsg.community_id,
              user_id: newMsg.user_id,
              message: newMsg.message,
              created_at: newMsg.created_at,
              username: "Anonymous",
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedCommunity, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCreateCommunity = async () => {
    if (!newCommunityName.trim()) {
      toast({ title: "Error", description: "Please enter a community name", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("institution_communities").insert({
        name: newCommunityName.trim(),
        institution_name: newCommunityInstitution.trim() || null,
        created_by: userId,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Community created successfully" });
      setNewCommunityName("");
      setNewCommunityInstitution(profile?.institution || "");
      setCreateOpen(false);
      fetchCommunities();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to create community", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedCommunity) return;

    try {
      const { error } = await supabase.from("community_messages").insert({
        community_id: selectedCommunity.id,
        user_id: userId,
        message: newMessage.trim(),
      });

      if (error) throw error;

      setNewMessage("");
      fetchMessages(selectedCommunity.id);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to send message", variant: "destructive" });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase.from("community_messages").delete().eq("id", messageId);
      if (error) throw error;
      if (selectedCommunity) fetchMessages(selectedCommunity.id);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete message", variant: "destructive" });
    }
  };

  const handleInviteMember = async () => {
    if (!inviteEmail.trim() || !selectedCommunity) return;

    try {
      // Look up user by email via auth admin (service role only) — for safety, use RPC or edge function.
      // Simpler approach: ask the invitee to join via community code/name. For now, store invite as a member row
      // only if we can find their user id. We'll skip the actual member insert here because we can't resolve auth email client-side.
      toast({
        title: "Invite feature",
        description: "Please share the community name with your colleague. They can ask you to add them once they register.",
      });
      setInviteEmail("");
      setInviteOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to invite member", variant: "destructive" });
    }
  };

  const openCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setActiveTab("chat");
  };

  if (activeTab === "chat" && selectedCommunity) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setActiveTab("list"); setSelectedCommunity(null); }}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{selectedCommunity.name}</h3>
            {selectedCommunity.institution_name && (
              <p className="text-xs text-muted-foreground truncate">{selectedCommunity.institution_name}</p>
            )}
          </div>
          {selectedCommunity.role === "admin" && (
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Add Member</DialogTitle>
                  <DialogDescription>Invite a colleague to this community.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="inviteEmail">Colleague email</Label>
                    <Input
                      id="inviteEmail"
                      type="email"
                      placeholder="colleague@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleInviteMember} disabled={!inviteEmail.trim()}>
                    Send Invite
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="max-h-[300px] overflow-y-auto p-3 space-y-3 bg-muted/30">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm font-medium">No messages yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start the conversation</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.user_id === userId
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-background border border-border"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {msg.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs">{msg.username}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                        {msg.user_id === userId && (
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="ml-auto text-muted-foreground hover:text-destructive"
                            aria-label="Delete message"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs whitespace-pre-wrap break-words">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-background">
            <div className="flex items-start gap-2">
              <Textarea
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="h-4 w-4" /> Institution Communities
          </h3>
          <p className="text-xs text-muted-foreground">
            Connect with your institution or centre for updates and support.
          </p>
        </div>
        {canCreateCommunity && (
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> Create Community
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Create Community</DialogTitle>
                <DialogDescription>Set up a private space and invite parents and ECD managers to join.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="communityName">Community name</Label>
                  <Input
                    id="communityName"
                    placeholder="e.g., Parents & Teachers Circle"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="institutionName">Institution / centre name (optional)</Label>
                  <Input
                    id="institutionName"
                    placeholder="e.g., Bright Stars ECD Centre"
                    value={newCommunityInstitution}
                    onChange={(e) => setNewCommunityInstitution(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreateCommunity}
                  disabled={loading || !newCommunityName.trim()}
                >
                  {loading ? "Creating..." : "Create Community"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {communities.length === 0 ? (
        <div className="p-4 border rounded-lg bg-muted/30 text-center">
          <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {canCreateCommunity
              ? "You have not created a community yet. Create one and invite parents and ECD managers to join."
              : "You are not part of any community yet. Ask a parent or ECD Manager to add you."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => openCommunity(community)}
              className="w-full text-left p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {community.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{community.name}</span>
                  {community.role === "admin" && (
                    <Badge variant="outline" className="text-[10px] h-4 px-1 flex items-center gap-1">
                      <Crown className="h-3 w-3" /> Admin
                    </Badge>
                  )}
                </div>
                {community.institution_name && (
                  <p className="text-xs text-muted-foreground truncate">{community.institution_name}</p>
                )}
                <p className="text-[10px] text-muted-foreground">Created by {community.creator_name}</p>
              </div>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

InstitutionCommunity.displayName = "InstitutionCommunity";
