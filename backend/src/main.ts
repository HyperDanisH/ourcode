import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { PrismaService } from './services/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(PrismaService).enableShutdownHooks(app);
  app.enableCors();
  app.use(morgan('dev'), helmet());
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(5000);
}
bootstrap();
