import { env } from "../../config/env.js";
import { verifyGithubSignature } from "../../shared/crypto.js";

export function validateGithubWebhook(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) throw new Error("Missing GitHub signature");

  const isValid = verifyGithubSignature(
    env.githubWebhookSecret,
    req.rawBody,
    signature
  );

  if (!isValid) throw new Error("Invalid GitHub signature");
}
