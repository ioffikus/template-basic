import Raven from 'raven-js';
import CommonCfg from 'src/configs/common';
import ReactCfg from 'src/configs/react';

export const sentryCfg = `https://${ReactCfg.SENTRY_KEY_REACT}@app.getsentry.com/${CommonCfg.SENTRY_PROJECT_ID}`;

export function logException(ex: Error, context?: object) {
  Raven.captureException(ex, {
    extra: context,
  });

  // tslint:disable-next-line:no-unused-expression
  window &&
    window.console &&
    console.error &&
    // tslint:disable-next-line:no-console
    console.error(ex);
}
