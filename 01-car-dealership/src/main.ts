import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove props not listed in the DTO
      forbidNonWhitelisted: true, // Throw error when the above occurs
    }),
  );
  await app.listen(3000);
}
bootstrap();

