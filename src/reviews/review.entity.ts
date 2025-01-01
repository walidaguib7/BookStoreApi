import { Book } from 'src/books/book.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rating: number;
  @Column({ nullable: true })
  comment: string;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Book)
  book: Book;
}
