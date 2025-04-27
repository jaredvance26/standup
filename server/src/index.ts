import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { jiraRouter } from "./routes/jira";
import { authRouter } from "./routes/auth";
import { settingsRouter } from "./routes/settings";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
app.use("/api/jira", jiraRouter);
app.use("/api/auth", authRouter);
app.use("/api/settings", settingsRouter);

// MongoDB connection
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI as string, {
    serverSelectionTimeoutMS: 10000,  // 10 second timeout
    family: 4                        // Use IPv4
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
