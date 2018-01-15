import { Request, Response } from 'express';
import errorsHandler from 'src/server/middlewares/errorsHandler';

const logoutRoute = (req: Request, res: Response) => {
  req.session.destroy(error => {
    if (error) {
      errorsHandler(error, req, res);
    } else {
      res.redirect('/');
    }
  });
};

export default logoutRoute;
