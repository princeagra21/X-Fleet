import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WinstonLoggerService } from './common/services/winston-logger.service';
import { securityConfig } from './common/config/security.config';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ValidationPipe as NestValidationPipe } from '@nestjs/common';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import * as path from 'node:path';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new WinstonLoggerService(),
    }
  );



  // after creating `app`:
    // cast to any to avoid Fastify version/type mismatches between packages
    await (app.register as any)(multipart as any, {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
      files: 1,
      fields: 5,
    },
  });

  // serve uploaded files at /uploads/**
  // cast to any to avoid Fastify version/type mismatches between packages
  await (app.register as any)(fastifyStatic as any, {
    root: path.resolve(process.cwd(), 'uploads'),
    prefix: '/uploads/',
    decorateReply: false,
  });


  app.use(securityConfig.helmet);
  app.use(new LoggingMiddleware().use);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new NestValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS backend is running on http://0.0.0.0:${port}`);
}
bootstrap();
