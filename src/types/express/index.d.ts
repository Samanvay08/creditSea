import { Express } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: 'verifier' | 'admin';
      };
    }
  }
}