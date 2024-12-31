import { PartialType } from '@nestjs/mapped-types';
import { createCategoryDto } from './create.dto';

export class updateCategoryDto extends PartialType(createCategoryDto) {}
