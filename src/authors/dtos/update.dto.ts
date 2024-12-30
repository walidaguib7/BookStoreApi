import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
