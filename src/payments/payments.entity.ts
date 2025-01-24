import { Order } from 'src/orders/orders.entity';
import { User } from 'src/users/users.entity';
import { paymentStatus } from 'src/utils/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  payment_Intent_Id: string;
  @Column()
  payment_method: string;
  @Column()
  payment_status: paymentStatus;
  @Column()
  amount: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @ManyToOne(() => User, (user) => user.payments)
  user: User;
  @ManyToOne(() => Order)
  order: Order;
}
