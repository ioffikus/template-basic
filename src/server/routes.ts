import express, { Request, Response } from 'express';
import _ from 'lodash';
import CommonCfg from 'src/configs/common';
import ServerCfg from 'src/configs/server';
import { logger } from 'src/server/logger/logger';
import serverStatusCheck from 'src/server/middlewares/serverStatusCheck';
import addUserIpToJSONData from './middlewares/addUserIpToJSONData';
import allowCrossDomain from './middlewares/allowCrossDomain';
import checkSession from './middlewares/checkSession';
import getToken from './middlewares/getToken';
import sessionMiddleware from './middlewares/session';
import loginRoute from './routes/login';
import logoutRoute from './routes/logout';
import oauthCompleteRoute from './routes/oauthComplete';
import payCompleteRoute from './routes/payComplete';
import proxyRoute from './routes/proxy';
import reactRoute from './routes/react';
import serverAuthErrorRoute from './routes/serverAuthError';
import staticFileResolver from './staticFileResolver';

const router = express.Router();

router.use(allowCrossDomain);
router.use(serverStatusCheck);

router.post(CommonCfg.REACT_API_PAYMENTS_PAY_MIDDL, getToken, addUserIpToJSONData);

router.all(`${CommonCfg.REACT_API_PATH}/**`, sessionMiddleware, checkSession, getToken, proxyRoute);

router.post(ServerCfg.PATHS.LOGIN, sessionMiddleware, checkSession, getToken, loginRoute);

router.post(
  ServerCfg.PATHS.PAY_COMPLETE,
  sessionMiddleware,
  checkSession,
  getToken,
  addUserIpToJSONData,
  payCompleteRoute,
);

router.get(ServerCfg.PATHS.OAUTH_COMPLETE, sessionMiddleware, checkSession, getToken, oauthCompleteRoute);

router.get(ServerCfg.PATHS.LOGOUT, sessionMiddleware, checkSession, logoutRoute);

router.get(ServerCfg.PATHS.AUTH_ERROR, serverAuthErrorRoute);

if (ServerCfg.LOG_LEVEL === 'debug') {
  router.get(ServerCfg.PATHS.DEV_CHECK_SESSION, sessionMiddleware, (req: Request, res: Response) => {
    const logStr = `session: ${_.get(req, 'session', null)}, token: ${_.get(req, 'session.token', null)}`;
    logger.info(logStr);
    res.json(req.session);
  });

  router.get(ServerCfg.PATHS.DEV_CHECK_PROCESS_PID, (req, res) => {
    res.send(`process ${process.pid} says hello!`).end();
  });
}

if (!module.hot) {
  router.get(ServerCfg.PATHS.PUBLIC_FILES, staticFileResolver);
}

router.get(ServerCfg.PATHS.FAVICON, (req, res) => {
  res.sendStatus(204);
});

// all react app routes for server rendering
router.get(ServerCfg.PATHS.ALL_REACT_APP_ROUTES, sessionMiddleware, checkSession, reactRoute);

export default router;
