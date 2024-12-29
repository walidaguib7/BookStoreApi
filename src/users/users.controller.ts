import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse()
  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  @ApiOkResponse()
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    await this.usersService.deleteUser(userId);
  }
}
