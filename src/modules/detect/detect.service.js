// src/modules/detect/detect.service.js

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { detectProjectType } from "./project-type.js";

export function detectFromRepo(repoUrl) {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const workDir = `/tmp/${repoName}`;

  // Clean old clone if exists
  if (fs.existsSync(workDir)) {
    fs.rmSync(workDir, { recursive: true, force: true });
  }

  // Clone repo
  execSync(`git clone ${repoUrl} ${workDir}`, { stdio: "ignore" });

  const packageJsonPath = path.join(workDir, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return {
      type: "unsupported",
      framework: null,
      reason: "package.json not found"
    };
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8")
  );

  const detection = detectProjectType(packageJson);

  return {
    ...detection,
    repoName
  };
}
