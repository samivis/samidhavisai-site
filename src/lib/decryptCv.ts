// Client-side decryptor for the /cv résumé payload.
// Mirrors scripts/encrypt-cv.mjs: PBKDF2-SHA256 -> AES-256-GCM.
// A wrong password fails GCM auth (throws) and reveals nothing.

export type CvContent = {
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    blurbStrong: string;
    blurbRest: string;
  };
  contact: { location: string; phone: string; email: string; blurb: string };
  contactLinks: { label: string; href: string }[];
  experience: { title: string; time: string; sub: string; bullets: string[] }[];
  toolkit: { group: string; items: string }[];
  education: { degree: string; dates: string; detail: string };
};

type Payload = {
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
};

function fromBase64(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKey(
  password: string,
  salt: ArrayBuffer,
  iterations: number
): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

// Returns the decrypted content, or throws if the password is wrong.
export async function decryptCv(
  payload: Payload,
  password: string
): Promise<CvContent> {
  const key = await deriveKey(
    password,
    fromBase64(payload.salt),
    payload.iterations
  );
  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(payload.iv) },
    key,
    fromBase64(payload.ciphertext)
  );
  const json = new TextDecoder().decode(plainBuf);
  return JSON.parse(json) as CvContent;
}
