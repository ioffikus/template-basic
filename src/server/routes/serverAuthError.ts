import { Request, Response } from 'express';

const serverAuthErrorRoute = (req: Request, res: Response) => {
  res.status(200).send('Your server is down. Contact Support.');
};

export default serverAuthErrorRoute;
