import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'crypto';

// Symmetric session signing key from environment or fallback for dev mode
const SESSION_SECRET = process.env.SESSION_SECRET || 'maven_hq_symmetric_session_secret_key_2026';

/**
 * Hash a password using standard memory-hard scrypt KDF with a unique random salt.
 * Returns in format: `salt:hash`
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function comparePassword(password: string, storedHash: string): boolean {
  try {
    // Legacy support for pre-existing plain-text password records (SEC-02 transition fallback)
    if (!storedHash.includes(':')) {
      return storedHash === password;
    }
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const verifyHash = scryptSync(password, salt, 64).toString('hex');
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'));
  } catch (err) {
    return false;
  }
}

export interface SessionPayload {
  role: 'admin' | 'client';
  email: string;
  brandId?: string;
  exp: number;
}

/**
 * Encrypt and sign a session payload into a high-entropy URL-safe base64 token.
 */
export function generateSessionToken(payload: Omit<SessionPayload, 'exp'>): string {
  // Session expires in 12 hours
  const exp = Date.now() + 12 * 60 * 60 * 1000;
  const fullPayload: SessionPayload = { ...payload, exp };
  
  const serialized = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  
  const hmac = createHmac('sha256', SESSION_SECRET);
  hmac.update(serialized);
  const signature = hmac.digest('base64url');
  
  return `${serialized}.${signature}`;
}

/**
 * Cryptographically verify and parse a session token, returning null if expired or tampered with.
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [serialized, signature] = token.split('.');
    if (!serialized || !signature) return null;
    
    const hmac = createHmac('sha256', SESSION_SECRET);
    hmac.update(serialized);
    const expectedSignature = hmac.digest('base64url');
    
    // Constant-time check signature
    const sigBuffer = Buffer.from(signature, 'base64url');
    const expectedBuffer = Buffer.from(expectedSignature, 'base64url');
    
    if (sigBuffer.length !== expectedBuffer.length) return null;
    
    const isValid = timingSafeEqual(sigBuffer, expectedBuffer);
    if (!isValid) return null;
    
    const parsed: SessionPayload = JSON.parse(
      Buffer.from(serialized, 'base64url').toString('utf8')
    );
    
    if (Date.now() > parsed.exp) {
      return null; // Expired
    }
    
    return parsed;
  } catch (err) {
    return null;
  }
}
