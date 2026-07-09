// Build-time encryptor for the /cv (Product) résumé.
//
// Reads the plaintext content from scripts/cv-content.mjs, encrypts it with
// AES-256-GCM using a key derived from the password via PBKDF2 (SHA-256),
// and writes the ciphertext-only payload to src/cv-encrypted.json.
//
// The plaintext NEVER ships. Only src/cv-encrypted.json (salt + iv +
// ciphertext, all base64) is bundled into the shipped /cv page.
//
// USAGE
//   npm run encrypt-cv
//   (or:  node scripts/encrypt-cv.mjs)
//
// Optional: override the password via CV_PASSWORD env var. Defaults to the
// site password below. The SAME password must be typed on the /cv page.
//
// RE-RUN THIS whenever you edit scripts/cv-content.mjs, then `npm run build`.

import { webcrypto as crypto } from "node:crypto";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cvContent } from "./cv-content.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PASSWORD = process.env.CV_PASSWORD || "agentic";
const ITERATIONS = 150000;

const enc = new TextEncoder();

function toBase64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

async function deriveKey(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
}

async function main() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(PASSWORD, salt);

  const plaintext = enc.encode(JSON.stringify(cvContent));
  const cipherBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );

  const payload = {
    v: 1,
    alg: "AES-GCM",
    kdf: "PBKDF2-SHA256",
    iterations: ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(cipherBuf)),
  };

  const outPath = resolve(__dirname, "../src/cv-encrypted.json");
  writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");

  console.log(`Encrypted CV → ${outPath}`);
  console.log(`  iterations: ${ITERATIONS}, salt/iv/ciphertext base64`);
  console.log(`  ciphertext bytes: ${cipherBuf.byteLength}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
