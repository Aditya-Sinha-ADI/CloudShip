export function detectProjectType(packageJson) {
  const scripts = packageJson.scripts || {};
  const deps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  };

  const hasBuild = !!scripts.build;

  const isFrontendFramework =
    deps.react ||
    deps["react-scripts"] ||
    deps.vue ||
    deps.svelte ||
    deps["@sveltejs/kit"] ||
    deps.vite ||
    deps.astro ||
    deps["solid-js"];
    
  if (hasBuild && isFrontendFramework) {
    return {
      type: "frontend",
      framework: "spa",
      buildRequired: true,
    };
  }

  if (scripts.start || scripts["start:prod"]) {
    return {
      type: "backend",
      framework: "node",
    };
  }

  return {
    type: "unsupported",
    reason: "No recognizable frontend or backend contract",
  };
}
