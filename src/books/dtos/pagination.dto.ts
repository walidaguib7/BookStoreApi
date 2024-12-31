// pagination.dto.ts
import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BooksPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Type(() => String)
  @IsString()
  title?: string;

  @IsOptional()
  categories: number[];
}