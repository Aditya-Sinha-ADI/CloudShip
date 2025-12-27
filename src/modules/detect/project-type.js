// src/modules/detect/project-type.js

export function detectProjectType(packageJson) {
  if (!packageJson || !packageJson.scripts) {
    return {
      type: "unsupported",
      framework: null
    };
  }

  const scripts = packageJson.scripts;
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  // 1. Detect type
  let type = "unsupported";

  if (scripts.start) {
    type = "backend";
  } else if (scripts.build) {
    type = "frontend";
  }

  // 2. Detect framework
  let framework = null;

  if (deps?.next) framework = "next";
  else if (deps?.react) framework = "react";
  else if (deps?.vite) framework = "vite";
  else if (deps?.express || deps?.fastify || deps?.["@nestjs/core"]) {
    framework = "node";
  }

  return { type, framework };
}
