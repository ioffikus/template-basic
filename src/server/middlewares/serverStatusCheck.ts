import { Request, Response, NextFunction } from 'express';
import ServerCfg from 'src/configs/server';

const serverStatusCheck = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const isHealthPath = path === ServerCfg.PATHS.HEALTH;

  if (isHealthPath) {
    return res.status(200).send('ok');
  }

  return next();
};

export default serverStatusCheck;
