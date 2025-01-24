import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payments } from './payments.entity';
import { Order } from 'src/orders/orders.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepo: Repository<Payments>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
  ) {}
}
