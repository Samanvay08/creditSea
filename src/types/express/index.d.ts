declare namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: 'verifier' | 'admin';
      };
    }
  }
  