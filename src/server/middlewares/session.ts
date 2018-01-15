import session from 'express-session';
import ServerCfg from 'src/configs/server';

const RedisStore = require('connect-redis')(session);

const sessionMiddleware = session({
  store: new RedisStore({
    host: ServerCfg.REDIS_HOST,
    port: ServerCfg.REDIS_PORT,
  }),
  secret: ServerCfg.COOKIE_SECRET,
  rolling: false,
  saveUninitialized: false,
  resave: false,
  cookie: {
    expires: ServerCfg.COOKIE_MAX_AGE,
    httpOnly: false,
  },
});

export default sessionMiddleware;
