// src/modules/deploy/deploy.strategy.js

import { deployRepo } from "./deploy.service.js";

export async function executeDeployment(strategyResult, repoUrl) {
  const { strategy } = strategyResult;

  if (strategy === "cloud-run-backend") {
    console.log("Deploying backend to Cloud Run (zero-config)");
    return deployRepo(repoUrl);
  }

  if (strategy === "static-site") {
    console.log("Static site deployment not implemented yet (V3 placeholder)");
    return {
      status: "pending",
      message: "Static site deployment will be added next"
    };
  }

  throw new Error("Unknown deployment strategy");
}
