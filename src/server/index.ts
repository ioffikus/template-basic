import AWSXRay from 'aws-xray-sdk';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Server } from 'http';
import ConfigHelper from 'src/helpers/configHelper';
import CommonCfg from 'src/configs/common';
import ServerCfg from 'src/configs/server';
import { expressWinstonMiddleware, logger } from 'src/server/logger/logger';
import errorsHandler from 'src/server/middlewares/errorsHandler';
import router from 'src/server/routes';
import 'src/server/numberToLocaleString';

AWSXRay.enableManualMode();

const app = express();
const segmentName = ServerCfg.AWS_XRAY_TRACING_NAME;

app.use(AWSXRay.express.openSegment(segmentName));

app.use(cookieParser(ServerCfg.COOKIE_SECRET));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (ConfigHelper.isDev()) {
  app.use(expressWinstonMiddleware);
}

app.use(router);

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
});

process.on('unhandledRejection', (error: Error) => {
  logger.error(error);
});

app.use(errorsHandler);

app.use(AWSXRay.express.closeSegment());

let server: Server;

if (ConfigHelper.isDev() && module.hot) {
  logger.info('[HMR] Waiting for server-side updates');

  module.hot.addStatusHandler(status => {
    if (status === 'abort' || status === 'prepare') {
      server.close();
    }
  });

  module.hot.accept();
}

server = app.listen(ServerCfg.PORT, () => {
  logger.info(`Server listening on: ${ServerCfg.PORT}`);
  logger.info(JSON.stringify(ServerCfg));
  logger.info(JSON.stringify(CommonCfg));
});
