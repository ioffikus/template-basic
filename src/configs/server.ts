import { IObject } from 'src/core/interfaces/IObject';
import _ from 'lodash';
import ConfigHelper from 'src/helpers/configHelper';
import Package from './../../package.json';

const _BASIC_CONFIG = {
  HOST: process.env.WEB_HOST || 'localhost',
  PORT: process.env.WEB_PORT || 3001,

  API_PROTOCOL: process.env.API_PROTOCOL || 'http',
  API_HOST: process.env.API_HOST || 'api.agg.loc',
  API_PORT: process.env.API_PORT || 8000,
  API_URL: '',

  PATHS: {
    API: process.env.API_PATH || '/v1/shop',
    AUTH_ERROR: '/auth_error',
    LOGIN: '/login',
    LOGOUT: '/logout',
    OAUTH_COMPLETE: '/oauth_complete',
    HEALTH: '/health',

    DEV_CHECK_SESSION: '/checksession',
    DEV_CHECK_PROCESS_PID: '/checkpid',

    PAY_COMPLETE: '/pay_complete/:service',

    PUBLIC_FILES: '/public/*',
    FAVICON: '/favicon.ico',

    ALL_REACT_APP_ROUTES: '/*',
  },

  STYLES_NAME: 'assets/styles.css',
  BUNDLE_NAME: 'assets/bundle.js',

  COOKIE_SECRET: process.env.WEB_COOKIE_SECRET || 'randomstring',
  COOKIE_MAX_AGE: process.env.WEB_COOKIE_MAX_AGE || 7 * 24 * 60 * 60 * 1000 - 10000, // 7 days - 10 000 s

  REDIS_HOST: process.env.REDIS_HOST || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  SENTRY_KEY_NODE: process.env.SENTRY_KEY_NODE || '',

  STATIC_PROTOCOL: process.env.STATIC_PROTOCOL || 'http',
  STATIC_HOST: process.env.STATIC_HOST || 'static.agg.loc',
  STATIC_PORT: process.env.STATIC_PORT || 8888,
  STATIC_VERSION: process.env.CIRCLE_BUILD_NUM || Package.version,

  INTERNAL_API_LOGIN: process.env.INTERNAL_API_LOGIN || 'test_login',
  INTERNAL_API_PASSWORD: process.env.INTERNAL_API_PASSWORD || 'Te$tPasSw0rD',

  LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/log',
  LOG_DATE_PATTERN: process.env.LOG_DATE_PATTERN || 'yyyy-MM-dd.',
  LOG_FILE_MAX_SIZE: process.env.LOG_FILE_MAX_SIZE || 500000,
  LOG_MAX_FILES: process.env.LOG_MAX_FILES || 100,
  LOG_LEVEL: process.env.LOG_LEVEL || 'error',

  AWS_XRAY_TRACING_NAME: process.env.AWS_XRAY_TRACING_NAME || 'ashop-web-unstable-segment',
};

// tslint:disable-next-line:max-line-length
_BASIC_CONFIG.API_URL = `${_BASIC_CONFIG.API_PROTOCOL}://${_BASIC_CONFIG.API_HOST}:${_BASIC_CONFIG.API_PORT}${_BASIC_CONFIG
  .PATHS.API}`;

const _configs: IObject<any> = {};

_configs[ConfigHelper.getEnvConstants().DEV] = _.assign(_BASIC_CONFIG, {
  ASSET_URL_DEV: `http://${_BASIC_CONFIG.API_HOST}:8050/`,
  STATIC_SERVER: `${_BASIC_CONFIG.STATIC_PROTOCOL}://${_BASIC_CONFIG.STATIC_HOST}:${_BASIC_CONFIG.STATIC_PORT}`,
});

_configs[ConfigHelper.getEnvConstants().PROD] = _.assign(_BASIC_CONFIG, {});

_configs[ConfigHelper.getEnvConstants().TEST] = _.assign(_BASIC_CONFIG, {});

_configs[ConfigHelper.getEnvConstants().STAGING] = _.assign(_BASIC_CONFIG, {});

_configs[ConfigHelper.getEnvConstants().UNSTABLE] = _.assign(_BASIC_CONFIG, {});

export default _configs[ConfigHelper.getEnv()];
