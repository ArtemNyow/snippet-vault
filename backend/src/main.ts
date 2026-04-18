import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";

let cachedServer: express.Express | null = null;

async function bootstrapExpress() {
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  nestApp.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await nestApp.init();
  return expressApp;
}

// Serverless handler для Vercel
export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrapExpress();
  }
  cachedServer(req, res);
}

// Локальний запуск (як і раніше)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3001;
  bootstrapExpress().then((expressApp) => {
    expressApp.listen(port, () =>
      console.log(`Backend running on http://localhost:${port}`),
    );
  });
}
