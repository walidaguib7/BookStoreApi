import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Authors } from './authors.entity';
import { CachingService } from 'src/config/cache/cache.service';
import { CreateAuthorDto } from './dtos/create.dto';
import { UpdateAuthorDto } from './dtos/update.dto';
import { AuthorsPaginationDto } from './dtos/pagination.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
    private readonly cachingService: CachingService,
  ) {}

  async getAll(query: AuthorsPaginationDto) {
    const { limit, page, name } = query;
    const key = `authors_${name}_${page}_${limit}`;
    const cachedAuthors =
      await this.cachingService.getFromCache<Authors[]>(key);
    if (cachedAuthors) return cachedAuthors;

    const whereClause: FindOptionsWhere<AuthorsPaginationDto> = {};
    if (name) {
      whereClause.name = Like(`%${name}%`);
    }
    const authors = await this.authorsRepository.find({
      where: whereClause,
      take: limit,
      skip: (page - 1) * limit,
    });
    if (authors.length == 0) return [];
    await this.cachingService.setAsync(key, authors);
    return authors;
  }

  async getAuthor(id: number) {
    const key = `author_${id}`;
    const cachedAuthor = await this.cachingService.getFromCache<Authors>(key);
    if (cachedAuthor) return cachedAuthor;
    const author = await this.authorsRepository.findOneByOrFail({ id });
    await this.cachingService.setAsync(key, author);
    return author;
  }

  async createOne(dto: CreateAuthorDto) {
    const author = this.authorsRepository.create(dto);
    await this.authorsRepository.save(author);
    await this.cachingService.removeByPattern('authors');
    await this.cachingService.removeByPattern('author');
  }

  async updateOne(id: number, dto: UpdateAuthorDto) {
    const author = await this.getAuthor(id);
    author.name = dto.name;
    author.biography = dto.biography;
    author.date_of_birth = dto.date_of_birth;
    await this.authorsRepository.save(author);
    await this.cachingService.removeByPattern('authors');
    await this.cachingService.removeByPattern('author');
  }

  async deleteOne(id: number) {
    const author = await this.getAuthor(id);
    await this.authorsRepository.delete(author);
    await this.cachingService.removeByPattern('authors');
    await this.cachingService.removeByPattern('author');
  }
}
