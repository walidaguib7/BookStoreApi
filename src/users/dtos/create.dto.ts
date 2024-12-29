import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty({ nullable: true })
  mediaId: number;
  @IsArray()
  @ApiProperty()
  role: string[];
}
