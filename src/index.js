// import express from "express";
// import { deployRepo } from "./deploy.service.js";

// const app = express();
// app.use(express.json());

// app.post("/deploy", async (req, res) => {
//   const { repoUrl } = req.body;

//   if (!repoUrl || !repoUrl.startsWith("https://github.com")) {
//     return res.status(400).json({ error: "Invalid GitHub repo URL" });
//   }

//   const result = await deployRepo(repoUrl);
//   res.json(result);
// });

// app.listen(3000, () => {
//   console.log("Auto deploy server running on port 3000");
// });
