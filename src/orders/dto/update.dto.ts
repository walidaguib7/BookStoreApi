import { PartialType } from '@nestjs/mapped-types';
import { createOrderDto } from './create.dto';

export class updateOrderDto extends PartialType(createOrderDto) {
  updated_at: Date;
}
