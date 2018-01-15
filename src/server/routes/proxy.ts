import { IAWSSegment } from 'aws-xray-sdk/index';
import { IAWSRequest } from 'src/core/interfaces/IAWSRequest';
import { Response } from 'express';
import _ from 'lodash';
import rp from 'request-promise';
import CommonCfg from 'src/configs/common';
import ServerCfg from 'src/configs/server';

const proxyRoute = (req: IAWSRequest, res: Response) => {
  const segment = req.segment;
  const subsegment: IAWSSegment = segment.addNewSubsegment('API Request');
  const requestPath = req.originalUrl.replace(`${CommonCfg.REACT_API_PATH}`, '');
  const url = `${ServerCfg.API_URL}${requestPath}`;
  const method = req.method;
  const authHeader = _.get(req, 'headers.authorization', null);
  const authToken = _.get(req, 'session.token', null);
  let authorization = '';
  if (!_.isNull(authToken)) {
    authorization = `JWT ${authToken}`;
  } else if (!_.isNull(authHeader)) {
    authorization = authHeader;
  }
  const headers = {
    authorization,
    'x-shop-token': _.get(req, 'headers.x-shop-token'),
    'Accept-Language': _.get(req, 'headers.accept-language'),
  };
  // tslint:disable-next-line:object-literal-key-quotes
  const responseHeaders = {
    Pragma: 'no-cache',
    Expires: 0,
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Surrogate-Control': 'no-store',
  };
  const options = {
    method,
    url,
    headers,
    body: req.body,
    json: true,
  };
  res.set(responseHeaders);
  subsegment.addMetadata('Request Options', options);
  rp(options)
    .then(json => {
      subsegment.addMetadata('Response JSON', json);
      res.status(200).send(json);
      subsegment.close();
    })
    .catch(error => {
      subsegment.addMetadata('Response ERROR', error);
      res.status(400).json({ error });
      subsegment.close();
    });
};

export default proxyRoute;
