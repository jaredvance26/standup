"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Utility class for encrypting and decrypting sensitive data
 */
class EncryptionService {
    // For AES-256, the key size needs to be 32 bytes
    static getEncryptionKey() {
        const key = process.env.ENCRYPTION_KEY || 'default-encryption-key-for-jira-tokens';
        // Create a 32-byte key by hashing if needed
        return crypto_1.default.createHash('sha256').update(String(key)).digest();
    }
    // For AES-256-CBC, the IV size needs to be exactly 16 bytes
    static getIV() {
        const iv = process.env.ENCRYPTION_IV || 'a-16-byte-iv-val';
        // Ensure exactly 16 bytes
        return Buffer.from(iv).slice(0, 16);
    }
    /**
     * Encrypts sensitive data like API tokens
     * @param text The text to encrypt
     * @returns The encrypted text
     */
    static encrypt(text) {
        if (!text)
            return null;
        try {
            const cipher = crypto_1.default.createCipheriv('aes-256-cbc', this.getEncryptionKey(), this.getIV());
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
        catch (error) {
            console.error('Encryption error:', error);
            return null;
        }
    }
    /**
     * Decrypts sensitive data like API tokens
     * @param encryptedText The encrypted text to decrypt
     * @returns The decrypted text
     */
    static decrypt(encryptedText) {
        if (!encryptedText)
            return null;
        try {
            const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', this.getEncryptionKey(), this.getIV());
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
}
exports.EncryptionService = EncryptionService;
