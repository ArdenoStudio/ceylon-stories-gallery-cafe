import crypto from 'crypto';

export type KeyProvider = 'gemini' | 'groq' | 'deepseek' | 'mistral' | 'cerebras' | 'openrouter' | 'huggingface';

export interface APIKey {
  provider: KeyProvider;
  accountId: string;
  projectId: string;
  modelTier: string;
  rpmLimit: number;
  rpdLimit: number;
  keyString: string;
  status: 'active' | 'cooldown' | 'exhausted' | 'error' | 'failover_standby';
  cooldownUntil?: number;
}

/**
 * Handles decryption of the keys.enc vault securely using AES-256-GCM.
 * Operates purely Server-Side within Next.js App Router (Node.js runtime).
 */
export class LLMKeyPool {
  private static instance: LLMKeyPool;
  private vaultLoaded: boolean = false;
  private keys: APIKey[] = [];

  private constructor() {}

  public static getInstance(): LLMKeyPool {
    if (!LLMKeyPool.instance) {
      LLMKeyPool.instance = new LLMKeyPool();
    }
    return LLMKeyPool.instance;
  }

  /**
   * Initializes the pool by reading and decrypting keys.enc.
   */
  public async initializePool(encryptedVaultData: string, masterKey: string): Promise<void> {
    if (this.vaultLoaded) return;
    try {
      this.keys = this.decryptVault(encryptedVaultData, masterKey);
      this.vaultLoaded = true;
      console.log(`[KeyPool] Initialized ${this.keys.length} API keys across providers.`);
    } catch (e) {
      console.error('[KeyPool] 🔴 FATAL: Failed to decrypt API key vault.', e);
      throw new Error('Key vault initialization failed.');
    }
  }

  private decryptVault(encryptedString: string, masterKeyPhase: string): APIKey[] {
    // Expected format: IV:AuthTag:EncryptedContent
    const parts = encryptedString.split(':');
    if (parts.length !== 3) throw new Error('Invalid vault format');
    
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = Buffer.from(parts[2], 'hex');
    
    // Hash master phase to 32 bytes
    const key = crypto.createHash('sha256').update(String(masterKeyPhase)).digest();

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted) as APIKey[];
  }

  public getKeysByProvider(provider: KeyProvider): APIKey[] {
    return this.keys.filter(k => k.provider === provider);
  }

  public updateKeyStatus(keyString: string, status: APIKey['status'], cooldownMs?: number): void {
    const key = this.keys.find(k => k.keyString === keyString);
    if (!key) return;

    key.status = status;
    if (cooldownMs && status === 'cooldown') {
      key.cooldownUntil = Date.now() + cooldownMs;
    }
  }
}
