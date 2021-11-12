import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Prisma NestJs example')
    .setDescription('Basic Crud')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'JJ Api' });

  await app.listen(3000);
}
bootstrap();
