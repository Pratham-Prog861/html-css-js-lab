import { SavedCode } from './storage';

export const encodeCode = (code: SavedCode): string => {
  try {
    const json = JSON.stringify(code);
    // standard btoa fails with unicode, so we escape/encode first
    return btoa(unescape(encodeURIComponent(json)));
  } catch (e) {
    console.error('Failed to encode code', e);
    return '';
  }
};

export const decodeCode = (encoded: string): SavedCode | null => {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const parsed = JSON.parse(json);
    // Basic validation to ensure it has the right shape
    if (typeof parsed.html === 'string' && typeof parsed.css === 'string' && typeof parsed.js === 'string') {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error('Failed to decode code', e);
    return null;
  }
};