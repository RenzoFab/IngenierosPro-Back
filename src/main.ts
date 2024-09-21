import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT_SERVER);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('IngenieroPro API')
    // .setDescription('Descripción de la API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
