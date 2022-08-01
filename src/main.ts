import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Get app config for cors/helmet settings and starting the app.
  const configService = app.get(ConfigService);
  const appConfig = configService.get('express');
  
  // Configure OPEN API/Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.description)
    .setVersion(appConfig.version)
    .addServer('/')
    .addServer('/xcode')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Apply custom logger
  app.useLogger(new LoggerService());

  // Enable/Disable CORS
  if(appConfig.enableCors) {
    app.enableCors();
  }
  
  await app.listen(appConfig.port);
}
bootstrap();
