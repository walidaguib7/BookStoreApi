import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response, Request } from 'express';

import Stripe from 'stripe';
import { StripeService } from 'src/stripe/stripe.service';
import { createPayment } from './dtos/create.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Get(':id')
  async getPayment(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentsService.getPayment(id);
  }

  @Get('user/:userId')
  async getPaymentsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.paymentsService.getUserPayments(userId);
  }

  @Get('order/:orderId')
  async getPaymentsByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.paymentsService.getOrderPayments(orderId);
  }

  @Post('webhook')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    await this.stripeService.handleStripeWebhook(req, res);
  }

  @Post()
  async createPaymentIntent(@Body() dto: createPayment) {
    await this.paymentsService.createPayment(dto);
  }
}
