import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  adresse: string;
  @Column()
  email: string;
  @Column()
  phone_number: string;
  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];
}
