import { Request, Response } from 'express';
import _ from 'lodash';
import rp from 'request-promise';
import Endpoints from 'src/configs/endpoints';
import ServerCfg from 'src/configs/server';
import { logger } from 'src/server/logger/logger';
import errorsHandler from 'src/server/middlewares/errorsHandler';

const payCompleteRoute = (req: Request, res: Response) => {
  const url = `${ServerCfg.API_URL}${Endpoints.PAYMENTS_CHECK}`;
  const headers = {
    'x-shop-token': _.get(req, 'headers.x-shop-token'),
    authorization: '',
  };
  const token = _.get(req, 'session.token', null);
  const service = _.get(req, 'params.service', null);
  const client_ip = _.get(req, 'body.client_ip', null);
  const trans_id = _.get(req, 'query.trans_id', null) || _.get(req, 'body.trans_id', null);
  const body = _.get(req, 'body');
  if (_.isNull(service)) {
    return errorsHandler({ errors: ['service not passed'] }, req, res);
  }
  if (_.isNull(client_ip)) {
    return errorsHandler({ errors: ['client_ip not passed'] }, req, res);
  }
  if (_.isNull(trans_id)) {
    return errorsHandler({ errors: ['trans_id not passed'] }, req, res);
  }
  const requestData = {
    service,
    client_ip,
    transaction_data: {
      trans_id,
      ...body,
    },
  };
  if (!_.isNull(token)) {
    headers.authorization = `JWT ${token}`;
  }
  const options = {
    url,
    headers,
    method: 'POST',
    body: requestData,
    json: true,
  };
  rp(options)
    .then(json => {
      const order_id = _.get(json, 'order_id', null);
      if (_.isNull(order_id)) {
        logger.error('no order_id after pay');
      }
      const redirectPath = `/user/orders?after_pay_id=${json.order_id}`;
      res.redirect(redirectPath);
    })
    .catch(error => {
      errorsHandler(error, req, res);
    });
};

export default payCompleteRoute;
