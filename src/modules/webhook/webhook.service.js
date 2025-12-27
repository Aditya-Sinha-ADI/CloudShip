import { githubConfig } from "../../config/github.js";
// import { deployRepo } from "../deploy/deploy.service.js";
import { detectFromRepo } from "../detect/detect.service.js";
import { selectDeployStrategy } from "../detect/strategy.factory.js";
import { executeDeployment } from "../deploy/deploy.strategy.js";


export async function handlePushEvent(payload) {
  if (payload.ref !== githubConfig.allowedBranch) {
    return { ignored: true };
  }

  const repoUrl = payload.repository.clone_url;
  const detection = detectFromRepo(repoUrl);
  const strategy = selectDeployStrategy(detection);
  await executeDeployment(strategy, repoUrl);

//   await deployRepo(repoUrl);

  return { deployed: true };
}

