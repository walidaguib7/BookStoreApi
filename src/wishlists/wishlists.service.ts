import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { WishLists } from './wishlists.entity';
import { CachingService } from 'src/config/cache/cache.service';
import { WishListsPaginationDto } from './dtos/pagination.dto';
import { AddToWishlistsDto } from './dtos/create.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(User) private readonly usersService: Repository<User>,
    @InjectRepository(Book) private readonly booksService: Repository<Book>,
    @InjectRepository(WishLists)
    private readonly wishListsRepo: Repository<WishLists>,
    private readonly cachingService: CachingService,
  ) {}

  async fetchAll(userId: number, query: WishListsPaginationDto) {
    const user = await this.usersService.findOneBy({ userId });
    if (!user) throw new NotFoundException('no user found!');
    const { limit, page } = query;
    const key = `wishlist_${userId}_${limit}_${page}`;
    const cachedWishList =
      await this.cachingService.getFromCache<WishLists[]>(key);
    if (cachedWishList) return cachedWishList;
    const result = await this.wishListsRepo.find({
      relations: {
        book: true,
        user: true,
      },
      where: { user },
      skip: (page - 1) * limit,
      take: limit,
    });
    await this.cachingService.setAsync(key, result);
    return result;
  }

  async AddToWishList(dto: AddToWishlistsDto) {
    const user = await this.usersService.findOne({
      where: { userId: dto.userId },
    });
    if (!user) throw new NotFoundException('no user found!');
    const book = await this.booksService.findOneBy({ id: dto.bookId });
    if (!user) throw new NotFoundException('no book found!');
    const result = this.wishListsRepo.create({
      user: user,
      book: book,
    });
    await this.wishListsRepo.save(result);
    console.log(dto.userId);
    await this.cachingService.removeByPattern('wishlist');
  }

  async RemoveFromWishList(id: number) {
    const item = await this.wishListsRepo.findOneBy({
      id,
    });
    if (!item) throw new NotFoundException('the item not found!');
    await this.wishListsRepo.remove(item);
    await this.cachingService.removeByPattern('wishlist');
  }
}
