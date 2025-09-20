import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WinstonLoggerService } from './common/services/winston-logger.service';
import { securityConfig } from './common/config/security.config';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ValidationPipe as NestValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
    const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new WinstonLoggerService(),
    }
  );


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
