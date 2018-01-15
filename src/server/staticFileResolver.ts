import { Request, Response } from 'express';
import _ from 'lodash';
import path from 'path';
import ConfigHelper from 'src/helpers/configHelper';
import errorsHandler from 'src/server/middlewares/errorsHandler';

const staticFileResolver = (req: Request, res: Response) => {
  const filePath = _.get(req, 'params[0]', null);
  const acceptEncoding = _.get(req, 'headers.accept-encoding', '');
  const basicDir = path.resolve('dist', 'client');
  const isGzip = acceptEncoding.indexOf('gzip') !== -1 && ConfigHelper.isProd();

  try {
    let fsPath = path.resolve(__dirname, `${basicDir}/${filePath}`);

    if (isGzip) {
      if (fsPath.indexOf('.css') !== -1) {
        res.setHeader('Content-Type', 'text/css');
      }

      if (fsPath.indexOf('.js') !== -1) {
        res.setHeader('Content-Type', 'application/javascript');
      }

      res.setHeader('Content-Encoding', 'gzip');
      fsPath += '.gz';
    }

    res.status(200).sendFile(fsPath);
  } catch (error) {
    errorsHandler(error, req, res);
  }
};

export default staticFileResolver;
