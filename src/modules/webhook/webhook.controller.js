import express from "express";
import { validateGithubWebhook } from "./webhook.validator.js";
import { handlePushEvent } from "./webhook.service.js";

export const githubWebhookRouter = express.Router();

githubWebhookRouter.post("/", (req, res) => {
  try {
    validateGithubWebhook(req);
    const result = handlePushEvent(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
