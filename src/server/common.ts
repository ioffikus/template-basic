import _ from 'lodash';
import ServerCfg from 'src/configs/server';
import { IReactRouteRequest } from 'src/core/interfaces/IReactRouteRequest';

const extractHostname = (url: string) => {
  let hostname;

  // find & remove protocol (http, ftp, etc.) and get the hostname
  hostname = url.indexOf('://') > -1 ? url.split('/')[2] : url.split('/')[0];

  // find & remove port number
  hostname = hostname.split(':')[0];

  return hostname;
};

const getDomain = (req: IReactRouteRequest) => {
  const xShopDomain = _.get(req, 'headers.x-shop-domain', null);

  let originHost = _.get(req, 'headers.origin', null);

  if (originHost) {
    originHost = extractHostname(originHost);
  }

  let host = req.get('host');

  if (host && host.indexOf(':') !== -1) {
    host = host.split(':')[0];
  }

  const result = xShopDomain || originHost || host;

  if (result === ServerCfg.HOST) {
    throw new Error('Invalid domain, may be xShopHeaders is not set in API call.');
  }

  return result;
};

export default {
  getDomain,
};
