import { RequestHandlerParams } from 'express-serve-static-core';

declare class AWSXRay {
  public static enableManualMode(): void;
  public static setLogger(logger: any): void;
  public static express: {
    openSegment(name: string): RequestHandlerParams;
    closeSegment(): RequestHandlerParams;
  };
}

export interface IAWSSegment {
  addNewSubsegment(name: string): IAWSSegment;
  close(): void;
  addMetadata(name: string, data: any): void;
}

export default AWSXRay;
