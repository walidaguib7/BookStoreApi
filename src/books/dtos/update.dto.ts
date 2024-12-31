import { PartialType } from '@nestjs/mapped-types';
import { createBookDto } from './create.dto';

export class updateBookDto extends PartialType(createBookDto) {}
