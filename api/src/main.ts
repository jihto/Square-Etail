import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); 
  app.use('/src/common/uploads/images', express.static(path.join(process.cwd(), 'src/common/uploads/images')));
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });
  await app.listen(process.env.PORT);
}
bootstrap();
