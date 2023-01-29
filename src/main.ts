import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`현재 ${port} 에서 동작중입니다.`);
}
bootstrap();
