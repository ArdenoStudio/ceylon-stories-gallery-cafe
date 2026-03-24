import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pre-req: npx install tsx 
// Usage: npx tsx scripts/key-encrypt.ts <master_key>

function encryptVault() {
  const masterKeyPhase = process.argv[2];
  if (!masterKeyPhase) throw new Error("Please provide a secure master key phase as argument 1");

  console.log('Encrypting API Key Vault using AES-256-GCM...');

  const rawPath = path.resolve(__dirname, '../src/config/keys.enc.example');
  const outPath = path.resolve(__dirname, '../src/config/keys.enc');

  if (!fs.existsSync(rawPath)) {
      throw new Error(`Vault file not found at ${rawPath}`);
  }

  const rawData = fs.readFileSync(rawPath, 'utf8');

  // AES-GCM requires a 12-byte initialization vector
  const iv = crypto.randomBytes(12);
  
  // Hash the master phrase to a fixed 32-bytes array for AES-256
  const key = crypto.createHash('sha256').update(String(masterKeyPhase)).digest();

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(rawData, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');

  // Custom encrypted format payload: IV:AuthTag:Content
  const payload = `${iv.toString('hex')}:${authTag}:${encrypted}`;
  
  fs.writeFileSync(outPath, payload);
  console.log(`✅ [SUCCESS] Vault securely encrypted and injected at src/config/keys.enc`);
}

encryptVault();
