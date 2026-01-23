import { UserProgress } from '../types';

const STORAGE_KEY = 'codecraft_progress';
const CODE_STORAGE_KEY = 'codecraft_code_cache';

const DEFAULT_PROGRESS: UserProgress = {
  completedChallengeIds: [],
  lastActiveChallengeId: null
};

export interface SavedCode {
  html: string;
  css: string;
  js: string;
}

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
  } catch (error) {
    console.error('Failed to load progress', error);
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progress: UserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress', error);
  }
};

export const markChallengeComplete = (challengeId: string) => {
  const progress = getProgress();
  if (!progress.completedChallengeIds.includes(challengeId)) {
    progress.completedChallengeIds.push(challengeId);
    saveProgress(progress);
  }
};

export const setLastActiveChallenge = (challengeId: string) => {
  const progress = getProgress();
  progress.lastActiveChallengeId = challengeId;
  saveProgress(progress);
};

export const getChallengeCode = (challengeId: string): SavedCode | null => {
  try {
    const stored = localStorage.getItem(CODE_STORAGE_KEY);
    const cache = stored ? JSON.parse(stored) : {};
    return cache[challengeId] || null;
  } catch (error) {
    console.error('Failed to load code cache', error);
    return null;
  }
};

export const saveChallengeCode = (challengeId: string, code: SavedCode) => {
  try {
    const stored = localStorage.getItem(CODE_STORAGE_KEY);
    const cache = stored ? JSON.parse(stored) : {};
    cache[challengeId] = code;
    localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save code cache', error);
  }
};
