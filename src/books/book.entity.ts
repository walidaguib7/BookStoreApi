import { Authors } from 'src/authors/authors.entity';
import { Category } from 'src/category/category.entity';
import { Discount } from 'src/discounts/discounts.entity';
import { Media } from 'src/media/media.entity';
import { Order } from 'src/orders/orders.entity';
import { Publisher } from 'src/publishers/publishers.entity';
import { Review } from 'src/reviews/review.entity';
import { WishLists } from 'src/wishlists/wishlists.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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
  @OneToOne(() => Media, (media) => media.book)
  @JoinColumn()
  media?: Media;
  @ManyToOne(() => Publisher)
  publisher?: Publisher;
  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({ name: 'Book_categories' })
  categories: Category[];
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
  @OneToMany(() => WishLists, (ws) => ws.book)
  wishlists: WishLists[];
  @ManyToMany(() => Discount)
  discounts: Discount[];
  @ManyToMany(() => Order, (order) => order.books)
  orders: Order[];
}
