import { CloudBuildClient } from "@google-cloud/cloudbuild";

const client = new CloudBuildClient();
const PROJECT_ID = "auto-deploy-v1";

export async function deployRepo(repoUrl) {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const serviceName = `app-${Date.now()}`;
  const image = `asia-south1-docker.pkg.dev/${PROJECT_ID}/deployments/${serviceName}`;

  const build = {
    steps: [
      {
        name: "gcr.io/cloud-builders/git",
        args: ["clone", repoUrl]
      },
      {
        name: "gcr.io/cloud-builders/docker",
        args: ["build", "-t", image, repoName]
      },
      {
        name: "gcr.io/cloud-builders/docker",
        args: ["push", image]
      },
      {
        name: "gcr.io/google.com/cloudsdktool/cloud-sdk",
        args: [
          "gcloud",
          "run",
          "deploy",
          serviceName,
          "--image",
          image,
          "--region",
          "asia-south1",
          "--platform",
          "managed",
          "--allow-unauthenticated"
        ]
      }
    ],
    images: [image]
  };

  await client.createBuild({
    projectId: PROJECT_ID,
    build
  });

  return {
    status: "BUILD_STARTED",
    serviceName
  };
}
