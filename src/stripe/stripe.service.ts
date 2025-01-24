import { Inject, Injectable, Req, Res } from '@nestjs/common';
import Stripe from 'stripe';
import { Response, Request } from 'express';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {});
  }

  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];

    try {
      const event = this.stripe.webhooks.constructEvent(
        req.body, // Raw request body
        sig,
        process.env.STRIPE_WEBHOOK_SECRET, // Webhook Secret Key
      );

      // Handle specific event types
      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('💰 PaymentIntent was successful!', event.data.object);
          break;

        case 'payment_intent.payment_failed':
          console.log('❌ PaymentIntent failed', event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(200).send('Webhook received!');
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      res.status(400).send('Webhook Error');
    }
  }
}
