import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Payments } from './payments.entity';
import { Order } from 'src/orders/orders.entity';
import Stripe from 'stripe';
import { StripeModule } from 'src/stripe/stripe.module';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Payments, Order]), StripeModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
})
export class PaymentsModule {}
