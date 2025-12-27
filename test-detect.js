// // test-detect-repo.js
// import { detectFromRepo } from "./src/modules/detect/detect.service.js";

// const repoUrl = "https://github.com/Aditya-Sinha-ADI/test-auto-deploy-v1.git";

// console.log(detectFromRepo(repoUrl));

// test-strategy.js
import { selectDeployStrategy } from "./src/modules/detect/strategy.factory.js";

console.log(
  selectDeployStrategy({ type: "backend", framework: "node" })
);

console.log(
  selectDeployStrategy({ type: "frontend", framework: "react" })
);
