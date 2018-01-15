const _BASIC_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  REACT_API_PATH: '/api',
  REACT_API_PAYMENTS_PAY_MIDDL: '/api/payments/pay/',
  SENTRY_PROJECT_ID: process.env.SENTRY_PROJECT_ID || '',

  COOKIE_LOCALE_MAX_AGE: process.env.WEB_COOKIE_LOCALE_MAX_AGE || 3650 * 24 * 60 * 60 * 1000, // 10 years in seconds

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'eu-west-1',
};

export default _BASIC_CONFIG;
