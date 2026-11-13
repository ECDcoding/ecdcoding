import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

// Matches PHP urlencode(), which PayFast uses to build signatures.
export function pfEncode(value: string): string {
  return encodeURIComponent(value)
    .replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, "+");
}

// Parameter string in the exact field order given (blank fields included, signature excluded).
export function buildParamString(data: Record<string, string>): string {
  return Object.keys(data)
    .filter((key) => key !== "signature")
    .map((key) => `${key}=${pfEncode((data[key] ?? "").trim())}`)
    .join("&");
}

export async function md5Signature(data: Record<string, string>, passphrase?: string): Promise<string> {
  let paramString = buildParamString(data);
  if (passphrase) paramString += `&passphrase=${pfEncode(passphrase.trim())}`;
  const hash = await crypto.subtle.digest("MD5", new TextEncoder().encode(paramString));
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
