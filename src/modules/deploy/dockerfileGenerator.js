import fs from "fs";
import path from "path";

export function ensureDockerfile(workDir, packageJson) {
  const dockerfilePath = path.join(workDir, "Dockerfile");
  
  if (fs.existsSync(dockerfilePath)) return;

  const hasBuild = packageJson?.scripts?.build;
  const startCmd = packageJson?.scripts?.["start:prod"]
    ? "start:prod"
    : "start";

  const dockerfile = `
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

${hasBuild ? "RUN npm run build" : ""}

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run", "${startCmd}"]
`;

  fs.writeFileSync(dockerfilePath, dockerfile.trim());
}
