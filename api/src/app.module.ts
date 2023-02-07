import { Module } from '@nestjs/common';
import { UsersModule } from './users/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
