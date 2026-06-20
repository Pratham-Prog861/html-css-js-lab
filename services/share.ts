import { SavedCode } from './storage';

export interface SharedPayload {
  id: string;
  html: string;
  css: string;
  js: string;
}

// URL-safe base64 conversion helpers
const toUrlSafe = (base64: string): string => {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const toStandard = (urlSafe: string): string => {
  let base64 = urlSafe.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64;
};

// Compress a string using Gzip and return URL-safe Base64
export const compressToToken = async (str: string): Promise<string> => {
  try {
    if (typeof CompressionStream === 'undefined') {
      const rawBase64 = btoa(unescape(encodeURIComponent(str)));
      return 'v0_' + toUrlSafe(rawBase64);
    }
    const stream = new Blob([str]).stream().pipeThrough(new CompressionStream('gzip'));
    const response = new Response(stream);
    const buffer = await response.arrayBuffer();
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return 'v1_' + toUrlSafe(btoa(binary));
  } catch (e) {
    console.error('Compression failed, falling back', e);
    const rawBase64 = btoa(unescape(encodeURIComponent(str)));
    return 'v0_' + toUrlSafe(rawBase64);
  }
};

// Decompress a token back to string
export const decompressFromToken = async (token: string): Promise<string> => {
  try {
    if (token.startsWith('v1_')) {
      const urlSafeBase64 = token.substring(3);
      const base64 = toStandard(urlSafeBase64);
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      const response = new Response(stream);
      return await response.text();
    } else {
      const urlSafeBase64 = token.startsWith('v0_') ? token.substring(3) : token;
      const base64 = toStandard(urlSafeBase64);
      return decodeURIComponent(escape(atob(base64)));
    }
  } catch (e) {
    console.error('Decompression failed', e);
    try {
      return decodeURIComponent(escape(atob(toStandard(token))));
    } catch (err) {
      return '';
    }
  }
};

export const encodeCode = (code: SavedCode): string => {
  try {
    const json = JSON.stringify(code);
    return toUrlSafe(btoa(unescape(encodeURIComponent(json))));
  } catch (e) {
    console.error('Failed to encode code', e);
    return '';
  }
};

export const decodeCode = (encoded: string): SavedCode | null => {
  try {
    const json = decodeURIComponent(escape(atob(toStandard(encoded))));
    const parsed = JSON.parse(json);
    if (typeof parsed.html === 'string' && typeof parsed.css === 'string' && typeof parsed.js === 'string') {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error('Failed to decode code', e);
    return null;
  }
};

export const encodeSharePayload = async (payload: SharedPayload): Promise<string> => {
  const json = JSON.stringify(payload);
  return await compressToToken(json);
};

export const decodeSharePayload = async (encoded: string): Promise<SharedPayload | null> => {
  const json = await decompressFromToken(encoded);
  if (!json) return null;
  try {
    const parsed = JSON.parse(json);
    if (
      typeof parsed.id === 'string' &&
      typeof parsed.html === 'string' &&
      typeof parsed.css === 'string' &&
      typeof parsed.js === 'string'
    ) {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error('Failed to decode share payload JSON', e);
    return null;
  }
};
