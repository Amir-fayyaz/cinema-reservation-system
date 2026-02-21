import { Request, Response } from 'express';
import morgan from 'morgan';

export const morganFormat = (
  tokens: morgan.TokenIndexer<Request, Response>,
  req: Request,
  res: Response,
): string => {
  return [
    `[${new Date().toISOString()}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${tokens['response-time'](req, res)}ms`,
    '-',
    tokens.res(req, res, 'content-length') || '0',
    'bytes',
    `"${tokens['user-agent'](req, res)}"`,
    tokens['remote-addr'](req, res),
  ].join(' ');
};

export const morganStream = {
  write: (message: string) => {
    const trimmed = message.trim();
    if (trimmed.includes(' 4') || trimmed.includes(' 5')) {
      console.error('\x1b[31m%s\x1b[0m', trimmed);
    } else {
      console.log('\x1b[32m%s\x1b[0m', trimmed);
    }
  },
};

export const morganOptions = {
  stream: morganStream,
  skip: (req: Request, res: Response) => {
    return req.url === '/health';
  },
};
