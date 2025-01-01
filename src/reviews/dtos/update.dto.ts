import { PartialType } from '@nestjs/mapped-types';
import { createReviewDto } from './create.dto';

export class updateReviewDto extends PartialType(createReviewDto) {}
