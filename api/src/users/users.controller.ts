import { Controller, Get, Param } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';

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
}
