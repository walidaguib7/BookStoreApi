import { IsNumber } from 'class-validator';

export class AddToWishlistsDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  bookId: number;
}
