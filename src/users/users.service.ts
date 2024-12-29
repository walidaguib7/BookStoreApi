import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';
import { HashPassword } from 'src/utils/Hashing';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/media.entity';
import { UpdateUserDto } from './dtos/update.dto';
import { CachingService } from 'src/config/cache/cache.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Media) private readonly mediaRepositoy: Repository<Media>,
    private readonly cachingService: CachingService,
  ) {}

  async CreateUser(dto: CreateUserDto) {
    const hash = await HashPassword(dto.password);
    const user = this.userRepository.create({
      ...dto,
      passwordHash: hash,
      roles: dto.role,
    });
    const file = await this.mediaRepositoy.findOne({
      where: { id: dto.mediaId },
    });
    user.file = file;
    await this.userRepository.save(user);
    await this.cachingService.removeCaching('users');
    await this.cachingService.removeByPattern('user');
  }

  async findAll() {
    const key = 'users';
    const cachedUsers = await this.cachingService.getFromCache<User[]>(key);
    if (cachedUsers) return cachedUsers;
    const users = await this.userRepository.find({
      relations: {
        file: true,
      },
    });
    await this.cachingService.setAsync(key, users);
    return users;
  }

  async findById(id: number) {
    const key = `user_${id}`;
    const cachedUser = await this.cachingService.getFromCache<User>(key);
    if (cachedUser != null) return cachedUser;
    const user = await this.userRepository.findOneByOrFail({ userId: id });
    await this.cachingService.setAsync(key, user);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({
      userId: id,
    });
    user.email = dto.email;
    user.username = dto.username;
    user.firstname = dto.firstname;
    user.lastname = dto.lastname;
    await this.userRepository.save(user);
    await this.cachingService.removeCaching('users');
    await this.cachingService.removeByPattern('user');
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOneByOrFail({
      userId,
    });
    await this.userRepository.remove(user);
    await this.cachingService.removeCaching('users');
    await this.cachingService.removeByPattern('user');
  }
}
