import "./instrument.js";
import * as Sentry from "@sentry/node";
import Koa from "koa";
import routers from "./routers/index.js";
import cors from "@koa/cors";
import bodyParser from "@koa/bodyparser";

const app = new Koa();

Sentry.setupKoaErrorHandler(app);

console.log("Setting up application middlewares");
app.use(cors());
app.use(bodyParser());

routers.forEach((router) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

export default app;
