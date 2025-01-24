import { Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response, Request } from 'express';

import Stripe from 'stripe';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Post('webhook')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    await this.stripeService.handleStripeWebhook(req, res);
  }
}
