import http from "node:http";
import handler from "./handler.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(handler).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const memoryUsage = process.memoryUsage();
  const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

  console.log("Memory Usage at Startup (in MB):", {
    rss: `${toMB(memoryUsage.rss)} MB`,
    heapTotal: `${toMB(memoryUsage.heapTotal)} MB`,
    heapUsed: `${toMB(memoryUsage.heapUsed)} MB`,
    external: `${toMB(memoryUsage.external)} MB`,
    arrayBuffers: `${toMB(memoryUsage.arrayBuffers)} MB`,
  });
});

export default server;
