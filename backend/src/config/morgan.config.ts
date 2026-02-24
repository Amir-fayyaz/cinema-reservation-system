import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import morgan from 'morgan';

const logger = new Logger('HTTP');

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

    const statusMatch = trimmed.match(/\s(\d{3})\s/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 200;

    if (status >= 400) {
      logger.error(trimmed);
    } else if (status >= 300 && status < 400) {
      logger.warn(trimmed);
    } else {
      logger.log(trimmed);
    }
  },
};

export const morganOptions = {
  stream: morganStream,
  skip: (req: Request, res: Response) => {
    return req.url === '/health' || req.url === '/metrics';
  },
};
