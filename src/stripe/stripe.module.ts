import { DynamicModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot(), PaymentsModule],
      providers: [
        StripeService,

        {
          provide: 'STRIPE_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_KEY'),
          inject: [ConfigService],
        },
      ],
    };
  }
}
