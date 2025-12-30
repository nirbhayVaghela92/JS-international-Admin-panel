import CryptoJS from "crypto-js";


export function decrypt(
  encryptedText: string,
  opts: { encryptionKeyHex?: string } = {encryptionKeyHex: process.env.NEXT_PUBLIC_ENCRYPTION_KEY}
): string {
  if (!encryptedText) return "";

  const parts = encryptedText.split(":");
  if (parts.length !== 2) return encryptedText;

  const [ivHex, encryptedHex] = parts;

  // WordArray type from CryptoJS
  let key: CryptoJS.lib.WordArray | null = null;

  // New AES (EncryptionUtil) – key is hex string
  if (opts.encryptionKeyHex) {
    const hex = opts.encryptionKeyHex.trim();
    if (/^[0-9a-fA-F]{64}$/.test(hex)) {
      key = CryptoJS.enc.Hex.parse(hex);
    } else {
      console.warn("Invalid encryptionKeyHex format (must be 64 hex chars)");
    }
  }

  if (!key) {
    console.error("No valid key provided to decrypt.");
    return "";
  }

  const iv = CryptoJS.enc.Hex.parse(ivHex);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(encryptedHex),
  });

  try {
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("decryptAny error:", err);
    return "";
  }
}
