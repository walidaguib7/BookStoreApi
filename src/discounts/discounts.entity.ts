import { Book } from 'src/books/book.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'discounts' })
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  discount_value: number;
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_At: Date;
  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
