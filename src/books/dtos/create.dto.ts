export class createBookDto {
  title: string;
  description: string;
  price: number;
  quantity_in_stock: number;
  published_date?: Date;
  authorId: number;
  mediaId?: number;
  publisherId?: number;
  categories: string[];
}
