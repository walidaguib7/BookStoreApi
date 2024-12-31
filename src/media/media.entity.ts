import { Book } from 'src/books/book.entity';
import { User } from 'src/users/users.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Media' })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  path: string;
  @OneToOne(() => User, (user) => user.file, { onDelete: 'SET NULL' })
  user: User;
  @OneToOne(() => Book, (book) => book.media)
  book: Book;
}
