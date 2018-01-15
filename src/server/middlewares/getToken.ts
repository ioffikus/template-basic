import { IReactRouteRequest } from 'src/core/interfaces/IReactRouteRequest';
import { NextFunction, Response } from 'express';
import _ from 'lodash';
import ServerCfg from 'src/configs/server';
import CommonServer from 'src/server/common';
import { logger } from 'src/server/logger/logger';
import redis from 'redis';
import rp, { RequestPromise } from 'request-promise';

const client = redis.createClient({
  host: ServerCfg.REDIS_HOST,
  port: ServerCfg.REDIS_PORT,
});

const _url = `${ServerCfg.API_PROTOCOL}://${ServerCfg.API_HOST}:${ServerCfg.API_PORT}/internal-api/v1/shop-token/`;

const getTokenFromBackend = (domain: string, login: string, password: string): RequestPromise => {
  const options = {
    json: true,
    method: 'POST',
    // don't set it to endpoints config
    url: _url,
    body: {
      login,
      password,
      domain,
    },
  };
  return rp(options);
};

const getTokenFromRedis = (key: string) => {
  if (_.isNil(key)) {
    return Promise.reject(new Error('Get token from redis: no key'));
  }
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
};

const setTokenToRedis = (key: string, token: string): Promise<any> => {
  if (_.isNil(key)) {
    return Promise.reject(new Error('Set token to Redis: no key'));
  }
  if (_.isNil(token)) {
    return Promise.reject(new Error('Set token to Redis: no token'));
  }
  return new Promise((resolve, reject) => {
    client.set(key, token, err => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const _getToken = (domain: string, login: string, password: string) => {
  const key = `host_key_${domain}`;
  return getTokenFromRedis(key).then((token: string) => {
    // reply is null when the key is missing
    if (_.isNil(token)) {
      return getTokenFromBackend(domain, login, password).then(data => {
        const respToken = _.get(data, 'token', null);
        return setTokenToRedis(key, respToken);
      });
    }
    return Promise.resolve(token);
  });
};

const SEGMENT_NAME = 'Get token';

const getToken = (req: IReactRouteRequest, res: Response, next: NextFunction) => {
  const segment = req.segment;
  const subsegment = segment.addNewSubsegment(SEGMENT_NAME);
  const domain = CommonServer.getDomain(req);
  _getToken(domain, ServerCfg.INTERNAL_API_LOGIN, ServerCfg.INTERNAL_API_PASSWORD)
    .then(serverAuthToken => {
      _.set(req, 'headers.x-shop-token', serverAuthToken);
      subsegment.addMetadata(`${SEGMENT_NAME} headers.x-shop-token`, serverAuthToken);
      subsegment.close();
      next();
    })
    .catch(error => {
      logger.error(req.url, error);
      subsegment.addMetadata(`${SEGMENT_NAME} error`, error);
      subsegment.close();
      res.redirect(ServerCfg.PATHS.AUTH_ERROR);
    });
};

export default getToken;
