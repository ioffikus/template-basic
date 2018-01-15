import winston, { Logger, LoggerInstance } from 'winston';
declare module 'winston' {
  // tslint:disable-next-line:interface-name
  interface LeveledLogMethod {
    // tslint:disable-next-line:callable-types
    (meta: any): LoggerInstance;
  }
}
import AWSXRay from 'aws-xray-sdk';

require('winston-daily-rotate-file');

import expressWinston from 'express-winston';
import ConfigHelper from 'src/helpers/configHelper';
import CommonCfg from 'src/configs/common';
import ServerCfg from 'src/configs/server';
import getSentryTransport from 'src/server/logger/transports/sentry';

const isDev = ConfigHelper.isDev();

const fileTransportConfig = {
  filename: ServerCfg.LOG_FILE_PATH,
  datePattern: ServerCfg.LOG_DATE_PATTERN,
  maxsize: ServerCfg.LOG_FILE_MAX_SIZE,
  maxFiles: ServerCfg.LOG_MAX_FILES,
  prepend: true,
  level: ServerCfg.LOG_LEVEL,
  colorize: false,
};

const consoleTransportConfig = {
  json: true,
  stringify: true,
  prettyPrint: true,
};

const consoleDevConfig = {
  colorize: true,
  json: false,
};

let transports;

const responseWhitelist = ['responseTime'];

if (isDev) {
  fileTransportConfig.colorize = true;
  responseWhitelist.push('body');

  transports = [
    new winston.transports.Console(consoleDevConfig),
    new winston.transports.DailyRotateFile(fileTransportConfig),
  ];
} else {
  transports = [
    new winston.transports.Console(consoleTransportConfig),
    new winston.transports.DailyRotateFile(fileTransportConfig),
  ];

  /**
   * sentry production bug 413 error on send to sentry.io
   */
  if (ConfigHelper.isUnstable()) {
    const sentryTransport: any = getSentryTransport({
      level: 'error',
      dsn: `https://${ServerCfg.SENTRY_KEY_NODE}@sentry.io/${CommonCfg.SENTRY_PROJECT_ID}`,
      tags: { key: 'value' },
      extra: { key: 'value' },
    });

    transports.push(sentryTransport);
  }
}

const expressWinstonMiddleware = expressWinston.logger({
  responseWhitelist,
  transports,
  meta: true,
  expressFormat: true,
  colorize: true,
  ignoredRoutes: ['/'],
});

const logger: LoggerInstance = new Logger({
  transports,
});

if (!ConfigHelper.isDev()) {
  AWSXRay.setLogger(logger);
}

export { expressWinstonMiddleware, logger };
