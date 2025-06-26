import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

interface LogEntry {
  stack: string;
  level: 'info' | 'warn' | 'error' | 'debug' | string;
  package: string;
  message: string;
}

export async function Log(
  stack: string,
  level: LogEntry['level'],
  pkg: string,
  message: string
): Promise<void> {
  const logPayload: LogEntry = { stack, level, package: pkg, message };

  try {
  
    await axios.post('http://20.244.56.144/evaluation-service/logs', logPayload);

  } catch (error) {
    console.error('Logging/API call failed:', error);
    console[level](`[${pkg}] ${message}`);
  }
}

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const stack = `${req.method} ${req.originalUrl}`;
  const level: LogEntry['level'] = 'info';
  const pkg = 'express-middleware';
  const message = `Request received: ${req.method} ${req.url}`;

  Log(stack, level, pkg, message)
    .then(() => next())
    .catch(() => next()); // Continue flow even if logging fails
}
