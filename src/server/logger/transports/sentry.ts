import { IObject } from 'src/core/interfaces/IObject';
import raven from 'raven';
import util from 'util';
import _ from 'lodash';
import winston from 'winston';

declare module 'winston' {
  // tslint:disable-next-line:class-name interface-name no-empty-interface no-shadowed-variable
  interface transports {
    Sentry?: any;
  }
  // tslint:disable-next-line:class-name interface-name no-empty-interface no-shadowed-variable
  interface LoggerInstance extends NodeJS.EventEmitter {
    Transport?: any;
    Logger?: any;
    transports: IObject<TransportInstance>;
  }
}

const getSentryTransport = (data: any) => {
  const Sentry: any = function(options: any): typeof Sentry {
    winston.Transport.call(this, _.pick(options, 'level'));
    // Default options
    this.defaults = {
      dsn: '',
      patchGlobal: false,
      logger: 'root',
      levelsMap: {
        silly: 'debug',
        verbose: 'debug',
        info: 'info',
        debug: 'debug',
        warn: 'warning',
        error: 'error',
      },
      tags: {},
      extra: {},
    };
    // For backward compatibility with deprecated `globalTags` option
    options.tags = options.tags || options.globalTags;
    this.options = _.defaultsDeep(options, this.defaults);
    this._sentry = this.options.raven || new raven.Client(this.options.dsn, this.options);
    if (this.options.patchGlobal) {
      this._sentry.patchGlobal();
    }
    interface IReasonError extends Error {
      reason?: string;
    }
    // Handle errors
    this._sentry.on('error', (error: IReasonError) => {
      let message = 'Cannot talk to sentry.';
      if (error && error.reason) {
        message += ` Reason: ${error.reason}`;
      }
      // tslint:disable-next-line:no-console
      console.log(message);
    });
    // Expose sentry client to winston.Logger
    winston.Logger.prototype.sentry_client = this._sentry;
  };

  //
  // Inherit from `winston.Transport` so you can take advantage
  // of the base functionality and `.handleExceptions()`.
  //
  util.inherits(Sentry, winston.Transport);

  //
  // Expose the name of this Transport on the prototype
  Sentry.prototype.name = 'sentry';
  //

  Sentry.prototype.log = function(level: string, msg: string | Error, meta: string, callback: any) {
    const nLevel = this.options.levelsMap[level];
    const nMeta = meta || {};
    const extraData: any = _.extend({}, nMeta);
    const tags = extraData.tags;
    delete extraData.tags;
    const extra: { tags: any[]; level: any; extra: any; request?: any; user?: any } = {
      tags,
      level: nLevel,
      extra: extraData,
    };
    if (extraData.request) {
      extra.request = extraData.request;
      delete extraData.request;
    }
    if (extraData.user) {
      extra.user = extraData.user;
      delete extraData.user;
    }
    try {
      if (nLevel === 'error') {
        if (nMeta instanceof Error) {
          if (msg === '') {
            // tslint:disable-next-line:no-param-reassign
            msg = nMeta;
          } else {
            nMeta.message = `${msg}. cause: ${nMeta.message}`;
            // tslint:disable-next-line:no-param-reassign
            msg = nMeta;
          }
        }
        this._sentry.captureException(msg, extra, () => {
          callback(null, true);
        });
      } else {
        this._sentry.captureMessage(msg, extra, () => {
          callback(null, true);
        });
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };
  return new Sentry(data);
};

export default getSentryTransport;
