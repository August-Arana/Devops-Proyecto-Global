import Router from "@koa/router";
const router = new Router({
  prefix: "/errors",
});


router.get("/error-test", (ctx) => {
  throw new Error("Error de prueba para Sentry");
});

export default router;
