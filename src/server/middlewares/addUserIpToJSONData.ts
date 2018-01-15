import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

const addUserIpToJSONData = (req: Request, res: Response, next: NextFunction) => {
  let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (client_ip === '::ffff:127.0.0.1') {
    client_ip = '127.0.0.1';
  }

  _.set(req, 'body.client_ip', client_ip);

  next();
};

export default addUserIpToJSONData;
