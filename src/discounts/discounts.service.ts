import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './discounts.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { BooksService } from 'src/books/books.service';
import { CategoryService } from 'src/category/category.service';
import { CachingService } from 'src/config/cache/cache.service';
import { DiscountsPaginationDto } from './dtos/pagination.dto';
import { createDiscountDto } from './dtos/create.dto';
import { Book } from 'src/books/book.entity';
import { Category } from 'src/category/category.entity';
import { updateDiscountDto } from './dtos/update.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepository: Repository<Discount>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly CategoriesRepository: Repository<Category>,
    private readonly cachingService: CachingService,
  ) {}

  async fetchAll(query: DiscountsPaginationDto) {
    const { limit, page, name, books, categories } = query;
    const key = `discounts_${limit}_${page}_${name}_${books}_${categories}`;
    const cachedDiscounts =
      await this.cachingService.getFromCache<Discount[]>(key);
    if (cachedDiscounts) return cachedDiscounts;

    const result = this.discountsRepository
      .createQueryBuilder('discounts')
      .leftJoinAndSelect('discounts.books', 'books')
      .leftJoinAndSelect('discounts.categories', 'categories')
      .skip((page - 1) * limit)
      .take(limit);

    if (name) {
      result.andWhere('discounts.name LIKE :name', { name: `%${name}%` });
    }
    if (categories && Array.isArray(categories) && categories.length > 0) {
      result.andWhere('categories.id IN (:...categories)', { categories });
    }
    if (books && Array.isArray(books) && books.length > 0) {
      result.andWhere('books.id IN (:...books)', { books });
    }

    const [discounts, total] = await result.getManyAndCount();
    await this.cachingService.setAsync(key, discounts);
    return { discounts, total };
  }

  async getDiscount(id: number) {
    const key = `discount_${id}`;
    const cachedDiscount =
      await this.cachingService.getFromCache<Discount>(key);
    if (cachedDiscount) return cachedDiscount;

    const result = await this.discountsRepository.findOneBy({
      id,
    });
    if (!result) throw new NotFoundException();
    await this.cachingService.setAsync(key, result);
    return result;
  }

  async createOne(dto: createDiscountDto) {
    const discount = this.discountsRepository.create({
      name: dto.name,
      discount_value: dto.discount_value,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });
    if (dto.books && dto.books.length > 0) {
      const books = await this.booksRepository.find({
        where: { title: In(dto.books) },
      });
      discount.books = books;
    } else {
      discount.books = [];
    }
    if (dto.categories && dto.categories.length > 0) {
      const categories = await this.CategoriesRepository.find({
        where: { name: In(dto.categories) },
      });
      discount.categories = categories;
    } else {
      discount.categories = [];
    }
    await this.discountsRepository.save(discount);

    await this.cachingService.removeByPattern('discounts');
    await this.cachingService.removeByPattern('discount');
  }

  async updateOne(id: number, dto: updateDiscountDto) {
    const discount = await this.discountsRepository.findOneBy({ id });
    if (!discount) throw new NotFoundException();
    discount.name = dto.name;
    discount.discount_value = dto.discount_value;
    discount.start_date = dto.start_date;
    discount.end_date = dto.end_date;

    if (dto.books && dto.books.length > 0) {
      const books = await this.booksRepository.find({
        where: { title: In(dto.books) },
      });
      discount.books = books;
    } else {
      discount.books = [];
    }
    if (dto.categories && dto.categories.length > 0) {
      const categories = await this.CategoriesRepository.find({
        where: { name: In(dto.categories) },
      });
      discount.categories = categories;
    } else {
      discount.categories = [];
    }

    await this.discountsRepository.save(discount);

    await this.cachingService.removeByPattern('discounts');
    await this.cachingService.removeByPattern('discount');
  }

  async deleteOne(id: number) {
    const discount = await this.discountsRepository.findOneBy({ id });
    if (!discount) throw new NotFoundException();
    await this.discountsRepository.remove(discount);
    await this.cachingService.removeByPattern('discounts');
    await this.cachingService.removeByPattern('discount');
  }
}
