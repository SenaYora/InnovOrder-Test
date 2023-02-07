import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('db.firebase.projectId'),
    privateKey: configService.get<string>('db.firebase.privateKey'),
    clientEmail: configService.get<string>('db.firebase.clientEmail'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  await app.listen(configService.get<number>('http.port') || 3001);
}
bootstrap();
