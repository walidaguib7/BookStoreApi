import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Book } from 'src/books/book.entity';
import { CachingService } from 'src/config/cache/cache.service';
import { createOrderDto } from './dto/create.dto';
import { updateOrderDto } from './dto/update.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    private readonly cachingService: CachingService,
  ) {}

  async getUserOrders(userId: number) {
    const user = await this.usersRepository.findOneBy({ userId });
    if (!user) throw new NotFoundException();
    const orders = await this.ordersRepository.find({
      where: {
        user,
      },
    });
    return orders;
  }

  async getOrder(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException();
    return order;
  }

  async createOne(dto: createOrderDto) {
    const user = await this.usersRepository.findOneBy({ userId: dto.userId });
    if (!user) throw new NotFoundException();
    const order = this.ordersRepository.create({
      user,
      updated_at: null,
    });

    const books = await this.booksRepository.find({
      where: { title: In(dto.books) },
    });

    if (books.length > 0) {
      order.books = books;
    } else {
      order.books = [];
    }

    await this.ordersRepository.save(order);

    for (const book of books) {
      book.quantity_in_stock = book.quantity_in_stock - 1;
      await this.booksRepository.save(book);
      await this.cachingService.removeByPattern('books');
      await this.cachingService.removeByPattern('book');
    }
  }

  async updateOne(id: number, dto: updateOrderDto) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException();
    order.status = dto.status;
    order.updated_at = new Date();
    const books = await this.booksRepository.find({
      where: { title: In(dto.books) },
    });

    if (books.length > 0) {
      order.books = books;
    } else {
      order.books = [];
    }
    await this.ordersRepository.save(order);
  }

  async deleteOne(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException();
    await this.ordersRepository.softDelete(order.id);
  }
}
