import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustacheExpress from 'mustache-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser('secret'));

  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustacheExpress());

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('Books')
    .addTag("Borrow")
    .addTag("Members")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
