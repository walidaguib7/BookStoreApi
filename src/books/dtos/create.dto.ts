export class createBookDto {
  title: string;
  description: string;
  price: number;
  quantity_in_stock: number;
  published_date?: Date;
  authorId: number;
  categories: string[];
}
