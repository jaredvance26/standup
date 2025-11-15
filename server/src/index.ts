import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { jiraRouter } from "./routes/jira";
import { authRouter } from "./routes/auth";
import { settingsRouter } from "./routes/settings";
import { teamMemberRouter } from "./routes/teamMember";
import { accountRouter } from "./routes/account";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
// Enhanced CORS to support Vercel deploys and additional client URLs
const primaryClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const extraClientUrls = (process.env.ADDITIONAL_CLIENT_URLS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = [primaryClientUrl, ...extraClientUrls];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests or same-origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow Vercel preview/prod deployments like https://*.vercel.app
      const vercelPattern = /https?:\/\/([a-z0-9-]+)\.vercel\.app$/i;
      if (vercelPattern.test(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // set true only if you switch to cookie-based auth
  })
);
app.use(express.json());

// Routes
app.use("/api", jiraRouter);
app.use("/api/auth", authRouter);
app.use("/api", settingsRouter);
app.use("/api", teamMemberRouter);
app.use("/api/account", accountRouter);

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
