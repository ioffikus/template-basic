import { IAWSSegment } from 'aws-xray-sdk';
import { Request } from 'express';

export interface IReactRouteRequest extends Request {
  segment?: IAWSSegment;
  get: (name: string) => string;
}
