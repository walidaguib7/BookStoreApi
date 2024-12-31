import { PartialType } from '@nestjs/mapped-types';
import { createPublisherDto } from './create.dto';

export class updatePublisherDto extends PartialType(createPublisherDto) {}
