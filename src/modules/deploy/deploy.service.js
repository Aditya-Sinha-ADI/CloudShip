import { CloudBuildClient } from "@google-cloud/cloudbuild";

const client = new CloudBuildClient();
const PROJECT_ID = "auto-deploy-v1";
const REGION = "asia-south1";

export async function deployRepo(repoUrl) {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const serviceName = `app-${Date.now()}`;
  const image = `${REGION}-docker.pkg.dev/${PROJECT_ID}/deployments/${serviceName}`;

  const build = {
    steps: [
      {
        name: "gcr.io/cloud-builders/git",
        args: ["clone", repoUrl],
      },
      {
        name: "node:18",
        entrypoint: "bash",
        args: [
          "-c",
          `
cd ${repoName}

if [ ! -f Dockerfile ]; then
  echo "Dockerfile not found. Generating default Dockerfile..."

  HAS_BUILD=$(node -e "const p=require('./package.json'); console.log(!!p.scripts?.build)")
  HAS_START_PROD=$(node -e "const p=require('./package.json'); console.log(!!p.scripts?.['start:prod'])")

  cat << EOF > Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EOF

  if [ "$$HAS_BUILD" = "true" ]; then
    echo "RUN npm run build" >> Dockerfile
  fi

  echo "ENV PORT=8080" >> Dockerfile
  echo "EXPOSE 8080" >> Dockerfile

  if [ "$$HAS_START_PROD" = "true" ]; then
    echo 'CMD ["npm", "run", "start:prod"]' >> Dockerfile
  else
    echo 'CMD ["npm", "run", "start"]' >> Dockerfile
  fi
fi
`,
        ],
      },
      {
        name: "gcr.io/cloud-builders/docker",
        args: ["build", "-t", image, repoName],
      },
      {
        name: "gcr.io/cloud-builders/docker",
        args: ["push", image],
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
          REGION,
          "--platform",
          "managed",
          "--allow-unauthenticated",
        ],
      },
    ],
    images: [image],
  };

  await client.createBuild({
    projectId: PROJECT_ID,
    build,
  });

  return {
    status: "BUILD_STARTED",
    serviceName,
  };
}
