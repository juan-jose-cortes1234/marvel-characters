import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Valida los DTOs de POST/PUT/PATCH y responde 400 si algo está mal
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora campos que no están en el DTO
      forbidNonWhitelisted: true, // ...o mejor, responde 400 si llegan
      transform: true, // convierte el body en una instancia del DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
