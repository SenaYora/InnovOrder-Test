import {Controller, Get, Param, ParamData, Req} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findAll(@Param('id') id: string): string {
    return `id is ${id}`;
  }
}
