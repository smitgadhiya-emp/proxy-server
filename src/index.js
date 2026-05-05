import express from "express";
import cors from "cors";
import { sendToQueue } from "./queue/sendToqueue.js";
import { startCronJobs, startCronJobsDeadLetter } from "./config/cron.config.js";

const app = express();
const PORT = 3001;  

app.use(cors({
  origin: "http://localhost:8080"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start cron jobs
startCronJobs();

// Start cron job for dead letter queue
startCronJobsDeadLetter()

app.get("/health", (req, res) => {
  res.send("Server is running!");
});

app.post("/send-to-queue", (req, res) => {
  const queueBody = req.body;

  if (!queueBody || Object.keys(queueBody).length === 0) {
    return res.status(400).json({
      error: "Request body is required. Send JSON with Content-Type: application/json.",
    });
  }

  const result = sendToQueue(queueBody);

  res.json({
    message: "Message sent to queue",
    result,
  });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: "Invalid JSON payload.",
    });
  }

  next(error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

