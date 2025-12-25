import express from "express";
import { githubWebhookRouter } from "./modules/webhook/webhook.controller.js";

export function createApp() {
  const app = express();

  // REQUIRED for GitHub signature verification
  app.use(
    express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
    })
  );

  app.use("/webhooks/github", githubWebhookRouter);

  return app;
}
