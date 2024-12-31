import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authors {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  biography: string;
  @Column({ nullable: true })
  date_of_birth: Date;
  @OneToMany(() => Book, (book) => book.author, { onDelete: 'CASCADE' })
  books: Book[];
}
