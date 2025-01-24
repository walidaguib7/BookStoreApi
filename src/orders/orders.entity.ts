import { Book } from 'src/books/book.entity';
import { Payments } from 'src/payments/payments.entity';
import { User } from 'src/users/users.entity';
import { OrderStatus } from 'src/utils/enums';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: OrderStatus, default: 'pending' })
  status: OrderStatus;
  @ManyToOne(() => User)
  user: User;
  @ManyToMany(() => Book, (book) => book.orders)
  @JoinTable({ name: 'books_orders' })
  books: Book[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn()
  deleted_At?: Date;
  @OneToMany(() => Payments, (payment) => payment.order)
  payments: Payments[];
}
