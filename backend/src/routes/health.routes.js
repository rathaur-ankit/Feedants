import { Router } from "express";
import os from "os";
import { ApiResponse } from "../utils/apiResponse.js";

const router = Router();

router.route("/").get((req, res) => {
  const memory = process.memoryUsage();
  return res.status(200).json(
    new ApiResponse(200, "System is healthy", {
      status: "UP",
      uptime: process.uptime(),
      pid: process.pid,
      timestamp: new Date().toISOString(),
      cpus: os.cpus().length,
      memory: {
        rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
      },
    })
  );
});

export default router;
