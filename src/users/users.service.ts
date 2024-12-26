import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';
import { HashPassword } from 'src/utils/Hashing';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async CreateUser(dto: CreateUserDto) {
    const hash = await HashPassword(dto.password);
    const user = this.userRepository.create({
      ...dto,
      passwordHash: hash,
      roles: dto.role,
    });

    await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
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
}
