import Router from "@koa/router";
const router = new Router();

router.get("/patient1", (ctx) => {
  ctx.body = {
    message: "patient 1's data",
  };
});

export default router;
