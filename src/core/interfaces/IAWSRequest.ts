import { Request } from 'express';
import { IAWSSegment } from 'aws-xray-sdk/index';

export interface IAWSRequest extends Request {
  segment?: IAWSSegment;
}
