import { Request, Response } from 'express';
import _ from 'lodash';
import rp from 'request-promise';
import ServerCfg from 'src/configs/server';
import errorsHandler from 'src/server/middlewares/errorsHandler';

const loginRoute = (req: Request, res: Response) => {
  const url = `${ServerCfg.API_URL}/auth/login/`;
  const headers = {
    'x-shop-token': _.get(req, 'headers.x-shop-token'),
  };
  const options = {
    headers,
    method: 'POST',
    uri: url,
    body: req.body,
    json: true,
  };
  rp(options)
    .then(body => {
      const token = _.get(body, 'token', null);
      // create session
      req.session.token = token;
      req.session.save(error => {
        if (error) {
          return Promise.reject(error);
        }
        return res.status(200).json(body);
      });
    })
    .catch(error => {
      errorsHandler(error, req, res);
    });
};

export default loginRoute;
