import { PartialType } from '@nestjs/mapped-types';
import { createBookDto } from './create.dto';

export class updateBookDto {
  title: string;
  description: string;
  price: number;
  quantity_in_stock: number;
  published_date?: Date;
  authorId: number;
  categories: string[];
}
