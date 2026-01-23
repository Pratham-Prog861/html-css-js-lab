export type CodeType = 'html' | 'css' | 'js';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: CodeType | 'mixed';
  initialCode: {
    html: string;
    css: string;
    js: string;
  };
  // validationCode is a stringified function body that returns true/false or an object
  // It has access to the DOM of the preview iframe
  validationCode: string;
  hint?: string;
}

export interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: number;
}

export interface UserProgress {
  completedChallengeIds: string[];
  lastActiveChallengeId: string | null;
}