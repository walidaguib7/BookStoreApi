import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './publishers.entity';
import { Repository } from 'typeorm';
import { createPublisherDto } from './dtos/create.dto';
import { updatePublisherDto } from './dtos/update.dto';
import { CachingService } from 'src/config/cache/cache.service';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    private readonly cachingService: CachingService,
  ) {}

  async getAll() {
    const key = 'publishers';
    const cachedPublishers =
      await this.cachingService.getFromCache<Publisher[]>(key);
    if (cachedPublishers) return cachedPublishers;
    const publishers = await this.publisherRepository.find();
    await this.cachingService.setAsync(key, publishers);
    return publishers;
  }

  async getOne(id: number) {
    const key = `publisher_${id}`;
    const cachedPublisher =
      await this.cachingService.getFromCache<Publisher>(key);
    if (cachedPublisher) return cachedPublisher;
    const publisher = await this.publisherRepository.findOne({
      where: { id: id },
    });
    if (!publisher) throw new NotFoundException();
    await this.cachingService.setAsync(key, publisher);
    return publisher;
  }

  async createOne(dto: createPublisherDto) {
    const result = this.publisherRepository.create(dto);
    await this.publisherRepository.save(result);
    await this.cachingService.removeByPattern('publishers');
    await this.cachingService.removeByPattern('publisher');
  }

  async updateOne(id: number, dto: updatePublisherDto) {
    const publisher = await this.publisherRepository.findOne({
      where: { id: id },
    });
    if (!publisher) throw new NotFoundException();
    publisher.name = dto.name;
    publisher.email = dto.email;
    publisher.adresse = dto.adresse;
    publisher.phone_number = dto.phone_number;
    await this.publisherRepository.save(publisher);
    await this.cachingService.removeByPattern('publishers');
    await this.cachingService.removeByPattern('publisher');
  }

  async deleteOne(id: number) {
    const publisher = await this.publisherRepository.findOne({
      where: { id: id },
    });
    if (!publisher) throw new NotFoundException();
    await this.publisherRepository.delete(publisher);
    await this.cachingService.removeByPattern('publishers');
    await this.cachingService.removeByPattern('publisher');
  }
}
