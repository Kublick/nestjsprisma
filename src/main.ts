import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Class Validator
  app.useGlobalPipes(new ValidationPipe());

  //Interceptor to serialize data
  app.useGlobalInterceptors(new TransformInterceptor());

  // Starts swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Prisma NestJs example')
    .setDescription('Basic Crud')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'JJ Api' });

  // Accept cookies
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
