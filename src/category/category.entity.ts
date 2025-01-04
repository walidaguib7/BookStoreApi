import { Book } from 'src/books/book.entity';
import { Discount } from 'src/discounts/discounts.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
  @ManyToMany(() => Discount)
  discounts: Discount[];
}
