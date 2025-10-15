interface PaymentRequest {
  botId: string;
  botName: string;
  price: number;
  currency?: string;
  contactEmail?: string;
}

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  error?: string;
  orderId?: string;
}

// Using the existing guest_actions.py API structure
interface GuestCheckoutRequest {
  order: {
    order_type: "single";
    currency: string;
    single: {
      service_id: string;
      panel_id?: number;
      quantity: number;
      target_url: string;
      comments?: string;
    };
  };
  payment_method: "dodo";
  return_url?: string;
  cancel_url?: string;
  contact_email?: string;
}

interface GuestCheckoutResponse {
  public_token: string;
  payment_method: string;
  amount: number;
  currency: string;
  payment: {
    payment_url: string;
    order_reference: string;
  };
}

class PaymentService {
  private baseUrl = 'https://paiement.botagram.fr/api/guest';
  private successUrl = 'https://paiement.botagram.fr/payment/success';
  private failedUrl = 'https://paiement.botagram.fr/payment/failed';

  async createPaymentLink(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Use the existing guest_actions.py API structure
      const guestRequest: GuestCheckoutRequest = {
        order: {
          order_type: "single",
          currency: request.currency || 'EUR',
          single: {
            service_id: request.botName, // Use bot name as service_id
            panel_id: undefined, // Optional field
            quantity: 1,
            target_url: `https://botagram.fr/bots/${request.botId}`,
            comments: `Bot d'automatisation pour ${request.botName}`,
          },
        },
        payment_method: "dodo",
        return_url: this.successUrl,
        cancel_url: this.failedUrl,
        contact_email: request.contactEmail,
      };

      const response = await fetch(`${this.baseUrl}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: GuestCheckoutResponse = await response.json();

      if (data.payment?.payment_url) {
        return {
          success: true,
          paymentUrl: data.payment.payment_url,
          orderId: data.public_token,
        };
      } else {
        return {
          success: false,
          error: 'Failed to create payment link',
        };
      }
    } catch (error) {
      console.error('Payment service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Method to handle payment success callback
  handlePaymentSuccess(searchParams: URLSearchParams): { success: boolean; orderId?: string; error?: string } {
    const guestToken = searchParams.get('guest_token');
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (guestToken && (success === 'true' || !error)) {
      return { success: true, orderId: guestToken };
    } else if (error) {
      return { success: false, error };
    } else {
      return { success: false, error: 'Payment status unknown' };
    }
  }

  // Method to handle payment failure callback
  handlePaymentFailure(searchParams: URLSearchParams): { success: boolean; error?: string } {
    const error = searchParams.get('error') || searchParams.get('reason');
    return { success: false, error: error || 'Payment was cancelled or failed' };
  }

  // Method to check payment status using the existing API
  async checkPaymentStatus(publicToken: string): Promise<{ success: boolean; status?: string; error?: string }> {
    try {
      const response = await fetch(`https://paiement.botagram.fr/api/guest/status/${publicToken}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        status: data.payment_state,
      };
    } catch (error) {
      console.error('Payment status check error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const paymentService = new PaymentService();
export type { PaymentRequest, PaymentResponse };
