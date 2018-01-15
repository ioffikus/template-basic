import { RequestHandlerParams } from 'express-serve-static-core';
declare namespace ExpressWinston {
  export function logger(options: any): RequestHandlerParams;
}

export = ExpressWinston;
