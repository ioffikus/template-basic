import { Request, Response } from 'express';
import _ from 'lodash';
import rp from 'request-promise';
import Endpoints from 'src/configs/endpoints';
import ServerCfg from 'src/configs/server';
import errorsHandler from 'src/server/middlewares/errorsHandler';

const oauthCompleteRoute = (req: Request, res: Response) => {
  const url = `${ServerCfg.API_URL}${Endpoints.AUTH.GWT_AGG}`;
  const headers = {
    'x-shop-token': _.get(req, 'headers.x-shop-token'),
  };
  const code = _.get(req, 'query.code', null);
  if (_.isNull(code)) {
    return res.status(400).send('Error. No auth code');
  }
  const options = {
    headers,
    method: 'POST',
    uri: url,
    body: {
      code,
    },
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
        return res.redirect('/');
      });
    })
    .catch(error => {
      errorsHandler(error, req, res);
    });
};

export default oauthCompleteRoute;
