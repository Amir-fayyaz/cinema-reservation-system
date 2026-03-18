// import { Logger } from '@nestjs/common';
// import { Request, Response } from 'express';
// import morgan from 'morgan';

// const logger = new Logger('HTTP');

// export const morganFormat = (
//   tokens: morgan.TokenIndexer<Request, Response>,
//   req: Request,
//   res: Response,
// ): string => {
//   return [
//     `[${new Date().toISOString()}]`,
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     `${tokens['response-time'](req, res)}ms`,
//     '-',
//     tokens.res(req, res, 'content-length') || '0',
//     'bytes',
//     `"${tokens['user-agent'](req, res)}"`,
//     tokens['remote-addr'](req, res),
//   ].join(' ');
// };

// export const morganStream = {
//   write: (message: string) => {
//     const trimmed = message.trim();

//     const statusMatch = trimmed.match(/\s(\d{3})\s/);
//     const status = statusMatch ? parseInt(statusMatch[1]) : 200;

//     if (status >= 400) {
//       logger.error(trimmed);
//     } else if (status >= 300 && status < 400) {
//       logger.warn(trimmed);
//     } else {
//       logger.log(trimmed);
//     }
//   },
// };

// export const morganOptions = {
//   stream: morganStream,
//   skip: (req: Request, res: Response) => {
//     return req.url === '/health' || req.url === '/metrics';
//   },
// };

import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as morgan from 'morgan';

const logger = new Logger('HTTP');

morgan.token('body', (req: Request) => {
  const body = { ...req.body };
  if (body.password) body.password = '***';
  if (body.token) body.token = '***';
  return JSON.stringify(body);
});

morgan.token('query', (req: Request) => {
  return JSON.stringify(req.query);
});

morgan.token('user-id', (req: Request) => {
  return (req as any).user?.id || 'anonymous';
});

morgan.token('correlation-id', (req: Request) => {
  return (req.headers['x-correlation-id'] as string) || '-';
});

morgan.token('real-ip', (req: Request) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
  }
  return (
    (req.headers['x-real-ip'] as string) || req.socket.remoteAddress || '-'
  );
});

export const morganFormat = (
  tokens: morgan.TokenIndexer<Request, Response>,
  req: Request,
  res: Response,
): string => {
  const status = tokens.status(req, res);
  const responseTime = tokens['response-time'](req, res);

  const logData = {
    timestamp: new Date().toISOString(),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: status,
    responseTime: `${responseTime}ms`,
    contentLength: tokens.res(req, res, 'content-length') || '0',
    userId: tokens['user-id'](req, res),
    correlationId: tokens['correlation-id'](req, res),
    ip: tokens['real-ip'](req, res),
    userAgent: tokens['user-agent'](req, res),
    referer: req.headers.referer || '-',
    query: Object.keys(req.query).length > 0 ? tokens.query(req, res) : '-',
    body:
      ['POST', 'PUT', 'PATCH'].includes(req.method) &&
      parseInt(status || '200') >= 400
        ? tokens.body(req, res)
        : '-',
  };

  return JSON.stringify(logData);
};

export const morganStream = {
  write: (message: string) => {
    try {
      const trimmed = message.trim();
      const logData = JSON.parse(trimmed);
      const status = parseInt(logData.status);

      const readableLog = `${logData.method} ${logData.url} ${logData.status} ${logData.responseTime} - User: ${logData.userId} - IP: ${logData.ip}`;

      if (status >= 500) {
        logger.error(readableLog, trimmed);
      } else if (status >= 400) {
        logger.warn(readableLog, trimmed);
      } else if (status >= 300) {
        logger.log(readableLog);
      } else {
        logger.log(readableLog);
      }
    } catch (error) {
      logger.error('Failed to parse morgan log', message);
    }
  },
};

export const morganOptions = {
  stream: morganStream,
  skip: (req: Request, _: Response) => {
    const skipPaths = ['/health', '/metrics', '/favicon.ico'];
    return skipPaths.includes(req.url);
  },
};
