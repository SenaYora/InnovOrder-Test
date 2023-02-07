import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SkipJwt } from '../auth/jwt.public.meta';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async find(@Param() params: FindUserDto): Promise<IUser> {
    return this.usersService.find(params.id);
  }

  @SkipJwt()
  @Post()
  async create(@Body() body: CreateUserDto): Promise<IUser> {
    return this.usersService.create(body);
  }
}
