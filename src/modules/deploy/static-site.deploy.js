import { execSync } from "child_process";
import path from "path";
import fs from "fs";

export async function deployStaticSite({ repoName, workDir, buildRequired }) {
  const safeRepoName = repoName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const bucketName = `cloudship-static-${safeRepoName}`;
  const region = "asia-south1";
  let uploadDir = workDir;

  console.log(`Deploying static site to bucket: ${bucketName}`);

  if (buildRequired) {
    execSync("npm install", {
      cwd: workDir,
      stdio: "inherit",
    });
    execSync("npm run build", {
      cwd: workDir,
      stdio: "inherit",
    });
  }

  try {
    execSync(`gsutil mb -l ${region} gs://${bucketName}`, {
      stdio: "inherit",
    });
    console.log("Bucket created");
  } catch (err) {
    console.log("Bucket creation failed or bucket already exists");
  }

  execSync(`gsutil uniformbucketlevelaccess set on gs://${bucketName}`, {
    stdio: "ignore",
  });

  execSync(`gsutil iam ch allUsers:objectViewer gs://${bucketName}`, {
    stdio: "ignore",
  });

  execSync(`gsutil web set -m index.html -e index.html gs://${bucketName}`, {
    stdio: "ignore",
  });

  if (buildRequired) {
    if (fs.existsSync(path.join(workDir, "build"))) {
      uploadDir = path.join(workDir, "build");
    } else if (fs.existsSync(path.join(workDir, "dist"))) {
      uploadDir = path.join(workDir, "dist");
    } else {
      throw new Error("Build output directory not found");
    }
  }

  execSync(`rm -rf ${workDir}/node_modules ${workDir}/.git`, {
    stdio: "ignore",
  });


  execSync(`gsutil -m cp -r ${uploadDir}/* gs://${bucketName}`, {
    stdio: "inherit",
  });

  return {
    status: "success",
    url: `https://storage.googleapis.com/${bucketName}/index.html`,
  };
}
