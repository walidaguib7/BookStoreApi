import { Book } from 'src/books/book.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WishLists {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;
  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;
  @ManyToOne(() => Book)
  book: Book;
}
