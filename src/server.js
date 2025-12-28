import { createApp } from "./app.js";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Version 2 server running on port ${PORT}`);
});



import { detectFromRepo } from "./modules/detect/detect.service.js";
import { selectDeployStrategy } from "./modules/detect/strategy.factory.js";
import { executeDeployment } from "./modules/deploy/deploy.strategy.js";
app.post("/__local_test/deploy", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const detection = detectFromRepo(repoUrl);
    const strategy = selectDeployStrategy(detection);
    const result = await executeDeployment(strategy, detection);

    res.json({ detection, strategy, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
