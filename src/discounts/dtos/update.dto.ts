import { PartialType } from '@nestjs/mapped-types';
import { createDiscountDto } from './create.dto';

export class updateDiscountDto extends PartialType(createDiscountDto) {}
