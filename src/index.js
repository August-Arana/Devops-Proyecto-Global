import Koa from "koa";
import routers from "./routers/index.js";
import cors from "@koa/cors";
import bodyParser from "@koa/bodyparser";

const app = new Koa();

console.log("Setting up application middlewares");
app.use(cors());
app.use(bodyParser());

routers.forEach((router) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

console.log("Starting on port 3000");
app.listen(3000);
