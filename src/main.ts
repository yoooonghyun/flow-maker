import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Job } from './domain/task/task';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const task = new Job();
}
bootstrap();
