import { Book } from 'src/books/book.entity';
import { Category } from 'src/category/category.entity';

export class createDiscountDto {
  name: string;
  discount_value: number;
  start_date: Date;
  end_date: Date;
  books: Book[];
  categories: Category[];
}
