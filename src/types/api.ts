export interface APIModel {
  pk: string;
}

export interface AuthResponse {
  data?: Token;
  message: string;
  success: boolean;
}

export interface Token {
  token: string;
}

export interface APIArrayResponse<T> {
  results: T[];
}

export interface APIResponse<T> {
  data?: T;
}

export enum APIProgress {
  INIT = 'INIT',
  REQ = 'REQ',
  ERR = 'ERR',
  SUCCESS = 'SUCCESS',
}

export interface APIState {
  error?: string;
  progress: APIProgress;
}

export const INITIAL_API_STATE: APIState = {
  error: undefined,
  progress: APIProgress.INIT,
};
