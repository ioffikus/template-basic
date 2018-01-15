const _ENV_CONSTANTS = {
  DEV: 'development',
  PROD: 'production',
  STAGING: 'staging',
  TEST: 'test',
  UNSTABLE: 'unstable',
};

const _ENV = process.env.NODE_ENV || _ENV_CONSTANTS.DEV;

const getEnv = () => _ENV;

const isDev = () => _ENV === _ENV_CONSTANTS.DEV;

const isProd = () => _ENV === _ENV_CONSTANTS.PROD;

const isTest = () => _ENV === _ENV_CONSTANTS.TEST;

const isStaging = () => _ENV === _ENV_CONSTANTS.STAGING;

const isUnstable = () => _ENV === _ENV_CONSTANTS.UNSTABLE;

const getEnvConstants = () => _ENV_CONSTANTS;

export default {
  getEnv,
  isDev,
  isProd,
  isTest,
  isStaging,
  isUnstable,
  getEnvConstants,
};
