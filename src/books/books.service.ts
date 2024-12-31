import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository, In, Like, FindOptionsWhere, Not } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { AuthorsService } from 'src/authors/authors.service';
import { CachingService } from 'src/config/cache/cache.service';
import { BooksPaginationDto } from './dtos/pagination.dto';
import { createBookDto } from './dtos/create.dto';
import { Category } from 'src/category/category.entity';
import { updateBookDto } from './dtos/update.dto';
import { Authors } from 'src/authors/authors.entity';
import { MediaService } from 'src/media/media.service';
import { PublishersService } from 'src/publishers/publishers.service';
import { Publisher } from 'src/publishers/publishers.entity';
import { Media } from 'src/media/media.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly BookRepositoy: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    private readonly cachingService: CachingService,
  ) {}

  async fetchAll(query: BooksPaginationDto) {
    const { categories, limit, page, title } = query;
    const key = `books_${categories}_${limit}_${page}_${title}`;
    const cachedCategories =
      await this.cachingService.getFromCache<Book[]>(key);
    if (cachedCategories) return cachedCategories;

    const result = await this.BookRepositoy.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.categories', 'categories')
      .skip((page - 1) * limit)
      .take(limit);

    if (title) {
      result.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }
    if (categories && categories.length > 0) {
      result.andWhere('categories.id IN (:...categories)', { categories });
    }

    const [books, total] = await result.getManyAndCount();
    await this.cachingService.setAsync(key, books);
    return { books, total };
  }

  async getBook(id: number) {
    const key = `book_${id}`;
    const cachedBook = await this.cachingService.getFromCache<Book>(key);
    if (cachedBook) return cachedBook;
    const book = await this.BookRepositoy.findOneBy({
      id,
    });
    if (!book) throw new NotFoundException();
    await this.cachingService.setAsync(key, book);
    return book;
  }

  async createBook(dto: createBookDto) {
    const author = await this.authorsRepository.findOneBy({ id: dto.authorId });
    if (!author) throw new NotFoundException('Author not found');

    const categories = await this.categoryRepository.find({
      where: { name: In(dto.categories) },
    });
    if (categories.length === 0)
      throw new NotFoundException('Categories not found');

    const media = await this.mediaRepository.findOne({
      where: { id: dto.mediaId },
    });
    const publisher = await this.publisherRepository.findOne({
      where: { id: dto.publisherId },
    });

    const book = this.BookRepositoy.create({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      published_date: dto.published_date,
      quantity_in_stock: dto.quantity_in_stock,
      media,
      publisher,
      author,
      categories,
    });

    // Save the book entity
    await this.BookRepositoy.save(book);

    // Clear related cache keys
    await this.cachingService.removeByPattern('books');
    await this.cachingService.removeByPattern('book');
  }

  async updateBook(id: number, dto: updateBookDto) {
    const categories = await this.categoryRepository.find({
      where: { name: In(dto.categories) },
    });

    if (categories.length == 0) {
      throw new NotFoundException('categories must have at least one item');
    }

    const media = await this.mediaRepository.findOne({
      where: { id: dto.mediaId },
    });
    const publisher = await this.publisherRepository.findOne({
      where: { id: dto.publisherId },
    });
    if (!publisher) throw new NotFoundException('publisher not found');

    const book = await this.BookRepositoy.findOne({
      where: { id: id },
    });
    if (book == null) throw new NotFoundException('book not found!');
    book.title = dto.title;
    book.description = dto.description;
    book.price = dto.price;
    book.published_date = dto.published_date;
    book.quantity_in_stock = dto.quantity_in_stock;
    book.media = media;
    book.publisher = publisher;

    const author = await this.authorsRepository.findOneBy({ id: dto.authorId });
    if (author == null) throw new NotFoundException('author not found');
    book.author = author;

    if (!categories || categories.length == 0) {
      throw new BadRequestException('categories must have at least one item');
    }
    book.categories = categories;
    await this.BookRepositoy.save(book);
    await this.cachingService.removeByPattern('books');
    await this.cachingService.removeByPattern('book');
  }

  async deleteOne(id: number) {
    const book = await this.BookRepositoy.findOneBy({
      id,
    });
    if (book == null) throw new NotFoundException('book not found!');
    await this.BookRepositoy.delete(book);
    await this.cachingService.removeByPattern('books');
    await this.cachingService.removeByPattern('book');
  }
}
