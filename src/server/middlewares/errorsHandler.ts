import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { logger } from 'src/server/logger/logger';
import util from 'util';

const errorsHandler = (errors: any, req: Request, res: Response, next?: NextFunction) => {
  const errorObject = {
    request: {
      body: _.get(req, 'body'),
      url: _.get(req, 'url'),
      headers: _.get(req, 'headers'),
    },
    response: {
      status: _.get(errors, 'response.status', null),
      headers: _.get(errors, 'response.headers', null),
      data: _.get(errors, 'response.data', null),
    },
    error: {
      message: _.get(errors, 'message', null),
      stack: _.get(errors, 'stack', null),
    },
  };
  logger.error(util.inspect(errorObject, { depth: 10 }));
  if (errors.isCriticalError) {
    process.exit(0);
  }
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(util.inspect(errorObject, { depth: 10 }));
};

export default errorsHandler;
