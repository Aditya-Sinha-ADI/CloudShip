import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { detectProjectType } from "./project-type.js";

export function detectFromRepo(repoUrl) {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const workDir = `/tmp/${repoName}`;
  const indexHtmlPath = path.join(workDir, "index.html");


  if (fs.existsSync(workDir)) {
    fs.rmSync(workDir, { recursive: true, force: true });
  }


  execSync(`git clone ${repoUrl} ${workDir}`, { stdio: "ignore" });

  const packageJsonPath = path.join(workDir, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    if (fs.existsSync(indexHtmlPath)) {
      return {
        type: "frontend",
        framework: "static",
        buildRequired: false,
        repoName,
        workDir,
      };
    }

    return {
      type: "unsupported",
      framework: null,
      reason: "No package.json or index.html found",
      repoName,
      workDir,
    };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  const detection = detectProjectType(packageJson);

  return {
    ...detection,
    repoName,
    workDir,
    repoUrl,
    packageJson,
  };
}
