import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthorsPaginationDto } from './dtos/pagination.dto';
import { CreateAuthorDto } from './dtos/create.dto';
import { UpdateAuthorDto } from './dtos/update.dto';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get()
  async getAll(@Query() query: AuthorsPaginationDto) {
    return await this.authorsService.getAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.authorsService.getAuthor(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @Post()
  async createOne(@Body() dto: CreateAuthorDto) {
    await this.authorsService.createOne(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuthorDto,
  ) {
    await this.authorsService.updateOne(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.authorsService.deleteOne(id);
  }
}
