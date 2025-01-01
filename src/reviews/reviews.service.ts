import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';
import { CachingService } from 'src/config/cache/cache.service';
import { ReviewPaginationDto } from './dtos/pagination.dto';
import { createReviewDto } from './dtos/create.dto';
import { updateReviewDto } from './dtos/update.dto';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    private readonly cachingService: CachingService,
  ) {}

  async fetchAll(query: ReviewPaginationDto, bookId: number) {
    const { limit, page } = query;
    const key = `reviews_${limit}_${page}`;
    const cachedReviews = await this.cachingService.getFromCache<Review[]>(key);
    if (cachedReviews) return cachedReviews;
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
    });
    if (!book) throw new NotFoundException();
    const reviews = await this.reviewRepository.find({
      where: { book },
      skip: (page - 1) * limit,
      take: limit,
    });
    await this.cachingService.setAsync(key, reviews);
    return reviews;
  }

  async getOne(id: number) {
    const key = `review_${id}`;
    const cachedReview = await this.cachingService.getFromCache<Review>(key);
    if (cachedReview) return cachedReview;
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) throw new NotFoundException();
    await this.cachingService.setAsync(key, review);
    return review;
  }

  async createOne(dto: createReviewDto) {
    const user = await this.userRepository.findOneBy({ userId: dto.userId });
    const book = await this.booksRepository.findOne({
      where: { id: dto.bookId },
    });

    const review = this.reviewRepository.create({
      rating: dto.rating,
      comment: dto.comment,
      user,
      book,
    });

    await this.reviewRepository.save(review);
    await this.cachingService.removeByPattern('reviews');
    await this.cachingService.removeByPattern('review');
  }

  async updateOne(id: number, dto: updateReviewDto) {
    const user = await this.userRepository.findOneBy({ userId: dto.userId });
    const book = await this.booksRepository.findOne({
      where: { id: dto.bookId },
    });

    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) throw new NotFoundException();

    review.rating = dto.rating;
    review.comment = dto.comment;
    review.user = user;
    review.book = book;
    await this.reviewRepository.save(review);
    await this.cachingService.removeByPattern('reviews');
    await this.cachingService.removeByPattern('review');
  }

  async deleteOne(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) throw new NotFoundException();
    await this.reviewRepository.delete(review);
    await this.cachingService.removeByPattern('reviews');
    await this.cachingService.removeByPattern('review');
  }
}
