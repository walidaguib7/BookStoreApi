import { Authors } from 'src/authors/authors.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  quantity_in_stock: number;
  @Column({ nullable: true })
  published_date: Date;
  @ManyToOne(() => Authors, (author) => author.books)
  author: Authors;
  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({ name: 'Book_categories' })
  categories: Category[];
}
