import { createApp } from "./app.js";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Version 2 server running on port ${PORT}`);
});

// setInterval(() => {
//   console.log("Server still alive");
// }, 5000);