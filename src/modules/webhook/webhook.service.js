import { githubConfig } from "../../config/github.js";

export function handlePushEvent(payload) {
  if (payload.ref !== githubConfig.allowedBranch) {
    return { ignored: true };
  }

  return {
    repoUrl: payload.repository.clone_url,
    commitSha: payload.after,
  };
}
