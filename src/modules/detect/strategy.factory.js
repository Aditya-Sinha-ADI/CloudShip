export function selectDeployStrategy(detectionResult) {
  const { type, framework } = detectionResult;

  if (type === "backend") {
    return {
      strategy: "cloud-run-backend",
      runtime: "node",
      framework
    };
  }

  if (type === "frontend") {
    return {
      strategy: "static-site",
      buildRequired: detectionResult.buildRequired ?? true,
      framework
    };
  }

  throw new Error(
    "Unsupported project type. Ensure package.json has start or build script."
  );
}
