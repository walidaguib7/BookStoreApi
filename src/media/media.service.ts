import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';
import { CreateFileDto } from './create.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private readonly mediaRepositoy: Repository<Media>,
  ) {}

  async getFile(id: number) {
    const file = await this.mediaRepositoy.findOneBy({ id: id });
    if (!file) throw new NotFoundException();
    return file;
  }

  async getAllFiles() {
    return await this.mediaRepositoy.find();
  }

  async uploadFile(file: Express.Multer.File) {
    const dto = new CreateFileDto();
    dto.name = file.filename;
    dto.path = file.path;
    const result = this.mediaRepositoy.create(dto);
    await this.mediaRepositoy.save(result);
    return result;
  }

  async UpdateFile(id: number, model: Express.Multer.File) {
    const file = await this.mediaRepositoy.findOneBy({ id: id });
    if (!file) throw new NotFoundException();
    file.name = model.filename;
    file.path = model.path;
    await this.mediaRepositoy.save(file);
  }
}
