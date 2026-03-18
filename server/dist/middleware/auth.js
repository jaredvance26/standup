"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireOwnUserIdFromBody = exports.requireOwnUserIdFromParams = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
if (!SECRET) {
    throw new Error("JWT SECRET environment variable is not set");
}
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Authentication token is required" });
    }
    jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const requireOwnUserIdFromParams = (req, res, next) => {
    const authenticatedUserId = req.user?.userId;
    const requestedUserId = req.params.userId;
    if (!authenticatedUserId) {
        return res.status(401).json({ error: "Authentication token is required" });
    }
    if (authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ error: "Access denied for requested user" });
    }
    next();
};
exports.requireOwnUserIdFromParams = requireOwnUserIdFromParams;
const requireOwnUserIdFromBody = (req, res, next) => {
    const authenticatedUserId = req.user?.userId;
    const requestedUserId = req.body?.userId;
    if (!authenticatedUserId) {
        return res.status(401).json({ error: "Authentication token is required" });
    }
    if (!requestedUserId || authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ error: "Access denied for requested user" });
    }
    next();
};
exports.requireOwnUserIdFromBody = requireOwnUserIdFromBody;
