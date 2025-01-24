import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payments } from './payments.entity';
import { Order } from 'src/orders/orders.entity';
import { User } from 'src/users/users.entity';
import { CachingService } from 'src/config/cache/cache.service';
import { StripeService } from 'src/stripe/stripe.service';
import { createPayment } from './dtos/create.dto';
import { paymentStatus } from 'src/utils/enums';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepo: Repository<Payments>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly cachingService: CachingService,
    private readonly stripeService: StripeService,
  ) {}

  async getPayment(id: number) {
    const payment = await this.paymentsRepo.findOne({
      where: {
        id,
      },
    });
    if (!payment) throw new NotFoundException();
    return payment;
  }

  async getUserPayments(userId: number) {
    const user = await this.usersRepo.findOneBy({ userId });
    const payments = await this.paymentsRepo.find({
      where: {
        user,
      },
      relations: {
        order: true,
        user: true,
      },
    });
    return payments;
  }

  async getOrderPayments(orderId: number) {
    const order = await this.ordersRepo.findOneBy({ id: orderId });
    const payments = await this.paymentsRepo.find({
      where: {
        order,
      },
      relations: {
        order: true,
        user: true,
      },
    });
    return payments;
  }

  async createPayment(dto: createPayment) {
    const order = await this.ordersRepo.findOneBy({ id: dto.orderId });
    const user = await this.usersRepo.findOneBy({ userId: dto.userId });
    if (!user || !order) throw new NotFoundException();
    const result = await this.stripeService.createPaymentIntent(
      dto.amount,
      'usd',
    );

    const payment = this.paymentsRepo.create({
      amount: dto.amount,
      payment_method: dto.payment_method,
      payment_status: paymentStatus.PENDING,
      user,
      order,
      payment_Intent_Id: result.id,
    });

    await this.paymentsRepo.save(payment);
  }

  async updatePaymentStatus(intentId: string, status: paymentStatus) {
    const payment = await this.paymentsRepo.findOneBy({
      payment_Intent_Id: intentId,
    });

    payment.payment_status = status;
    await this.paymentsRepo.save(payment);
  }
}
