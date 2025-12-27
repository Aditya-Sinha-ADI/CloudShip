import { githubConfig } from "../../config/github.js";
import { deployRepo } from "../deploy/deploy.service.js";

export async function handlePushEvent(payload) {
  if (payload.ref !== githubConfig.allowedBranch) {
    return { ignored: true };
  }

  const repoUrl = payload.repository.clone_url;

  await deployRepo(repoUrl);

  return { deployed: true };
}

