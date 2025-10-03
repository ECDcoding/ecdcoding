import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Gift, Clock } from 'lucide-react';
import { usePromoCode } from '@/hooks/usePromoCode';

export const PromoCodeBanner = () => {
  const { hasAccess, expiresAt, redeemCode, loading } = usePromoCode();
  const [code, setCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeem = async () => {
    if (!code.trim()) return;
    
    setIsRedeeming(true);
    await redeemCode(code);
    setIsRedeeming(false);
    setCode('');
  };

  const getDaysRemaining = () => {
    if (!expiresAt) return 0;
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) return null;

  if (hasAccess) {
    const daysRemaining = getDaysRemaining();
    return (
      <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-full">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-green-900">Promo Active!</p>
              <p className="text-sm text-green-700">
                You have free access to premium features
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-800">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-blue-500 p-2 rounded-full">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Have a Promo Code?</p>
            <p className="text-sm text-blue-700">
              Unlock 14 days of free access to premium features
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="md:w-48 bg-white"
            onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
          />
          <Button 
            onClick={handleRedeem} 
            disabled={!code.trim() || isRedeeming}
            className="whitespace-nowrap"
          >
            {isRedeeming ? 'Redeeming...' : 'Redeem'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
