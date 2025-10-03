import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/components/ui/use-toast';

interface PromoCodeStatus {
  hasAccess: boolean;
  expiresAt: Date | null;
  features: string[];
  loading: boolean;
}

export const usePromoCode = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<PromoCodeStatus>({
    hasAccess: false,
    expiresAt: null,
    features: [],
    loading: true,
  });

  const checkPromoAccess = async () => {
    if (!user) {
      setStatus({ hasAccess: false, expiresAt: null, features: [], loading: false });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_promo_codes')
        .select(`
          expires_at,
          is_active,
          promo_codes (
            features_unlocked
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking promo access:', error);
        setStatus({ hasAccess: false, expiresAt: null, features: [], loading: false });
        return;
      }

      if (data) {
        const features = (data.promo_codes as any)?.features_unlocked || [];
        setStatus({
          hasAccess: true,
          expiresAt: new Date(data.expires_at),
          features,
          loading: false,
        });
      } else {
        setStatus({ hasAccess: false, expiresAt: null, features: [], loading: false });
      }
    } catch (error) {
      console.error('Error checking promo access:', error);
      setStatus({ hasAccess: false, expiresAt: null, features: [], loading: false });
    }
  };

  const redeemCode = async (code: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to redeem a promo code',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('redeem_promo_code', {
        promo_code_text: code.toUpperCase().trim(),
      });

      if (error) {
        console.error('Error redeeming code:', error);
        toast({
          title: 'Error',
          description: 'Failed to redeem promo code',
          variant: 'destructive',
        });
        return false;
      }

      const result = data as { success: boolean; message: string; expires_at?: string };

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        await checkPromoAccess(); // Refresh status
        return true;
      } else {
        toast({
          title: 'Invalid Code',
          description: result.message,
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Error redeeming code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    checkPromoAccess();
  }, [user]);

  return {
    ...status,
    redeemCode,
    refreshStatus: checkPromoAccess,
  };
};
