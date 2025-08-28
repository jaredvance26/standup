"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const jira_1 = require("./routes/jira");
const auth_1 = require("./routes/auth");
const settings_1 = require("./routes/settings");
const teamMember_1 = require("./routes/teamMember");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
}));
app.use(express_1.default.json());
// Routes
app.use("/api", jira_1.jiraRouter);
app.use("/api/auth", auth_1.authRouter);
app.use("/api", settings_1.settingsRouter);
app.use("/api", teamMember_1.teamMemberRouter);
// MongoDB connection
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // 10 second timeout
    family: 4 // Use IPv4
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
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
