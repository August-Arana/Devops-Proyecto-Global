//import 'dotenv/config';
import * as Sentry from "@sentry/node";

// Imprime la DSN para verificar que no sea undefined
console.log("Initializing Sentry with DSN:", process.env.SENTRY_DSN);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
});
