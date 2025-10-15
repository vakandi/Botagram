import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlowButton } from '@/components/ui/glow-button';
import { ArrowRight, Loader2, CreditCard } from 'lucide-react';
import { paymentService, PaymentRequest } from '@/services/paymentService';
import { toast } from 'sonner';

interface PaymentButtonProps {
  botId: string;
  botName: string;
  price: number;
  currency?: string;
  contactEmail?: string;
  variant?: 'default' | 'glow' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const PaymentButton = ({
  botId,
  botName,
  price,
  currency = 'EUR',
  contactEmail,
  variant = 'glow',
  size = 'md',
  className = '',
  children,
}: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const paymentRequest: PaymentRequest = {
        botId,
        botName,
        price,
        currency,
        contactEmail,
      };

      const result = await paymentService.createPaymentLink(paymentRequest);

      if (result.success && result.paymentUrl) {
        // Redirect to payment page
        window.location.href = result.paymentUrl;
      } else {
        toast.error(result.error || 'Erreur lors de la création du lien de paiement');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-4 text-sm';
      case 'lg':
        return 'h-12 px-8 text-base';
      default:
        return 'h-10 px-6 text-sm';
    }
  };

  const getVariantComponent = () => {
    const baseClasses = `${getSizeClasses()} ${className}`;
    const content = (
      <>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Création du paiement...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            {children || `Acheter ${botName}`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </>
    );

    switch (variant) {
      case 'premium':
        return (
          <Button
            variant="premium"
            className={baseClasses}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {content}
          </Button>
        );
      case 'glow':
        return (
          <GlowButton
            className={baseClasses}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {content}
          </GlowButton>
        );
      default:
        return (
          <Button
            className={baseClasses}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {content}
          </Button>
        );
    }
  };

  return getVariantComponent();
};
