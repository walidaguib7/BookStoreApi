import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Payments } from './payments.entity';
import { Order } from 'src/orders/orders.entity';
import Stripe from 'stripe';
import { StripeModule } from 'src/stripe/stripe.module';
import { StripeService } from 'src/stripe/stripe.service';
import { CacheModule } from 'src/config/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Payments, Order]),
    StripeModule,
    CacheModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
