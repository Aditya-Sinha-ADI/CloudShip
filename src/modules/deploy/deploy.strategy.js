import { deployRepo } from "./deploy.service.js";
import { deployStaticSite } from "./static-site.deploy.js";

export async function executeDeployment(strategyResult, detectionResult) {
  const { strategy, buildRequired } = strategyResult;
  const { repoName, workDir } = detectionResult;

  if (strategy === "cloud-run-backend") {
    console.log("Deploying backend to Cloud Run (zero-config)");
    return deployRepo(detectionResult.repoUrl);
  }

  if (strategy === "static-site") {
    console.log("Deploying frontend as static site");
    return deployStaticSite({
      repoName,
      workDir,
      buildRequired,
    });
  }

  throw new Error("Unknown deployment strategy");
}
