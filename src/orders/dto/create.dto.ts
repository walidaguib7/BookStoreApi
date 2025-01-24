import { Book } from 'src/books/book.entity';
import { OrderStatus } from 'src/utils/enums';

export class createOrderDto {
  status: OrderStatus;
  userId: number;
  books: Book[];
}
