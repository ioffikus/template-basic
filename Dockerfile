FROM node:9.3.0-alpine

ARG NODE_ENV
ARG SENTRY_KEY_REACT
ARG SENTRY_PROJECT_ID
ARG STATIC_PROTOCOL
ARG STATIC_HOST
ARG STATIC_PORT
ARG CIRCLE_BUILD_NUM
ENV API_HOST ${API_HOST}
ENV API_PORT ${API_PORT}
ENV API_PROTOCOL ${API_PROTOCOL}
ENV API_PATH ${API_PATH}
ENV NODE_ENV ${NODE_ENV}
ENV SENTRY_KEY_REACT ${SENTRY_KEY_REACT}
ENV SENTRY_PROJECT_ID ${SENTRY_PROJECT_ID}
ENV STATIC_PROTOCOL ${STATIC_PROTOCOL}
ENV STATIC_HOST ${STATIC_HOST}
ENV STATIC_PORT ${STATIC_PORT}
ENV CIRCLE_BUILD_NUM ${CIRCLE_BUILD_NUM}
ENV AWS_XRAY_TRACING_NAME ${AWS_XRAY_TRACING_NAME}

COPY . /app
WORKDIR /app

RUN NODE_ENV=unstable npm install \
  && npm run build \
  && npm remove -g webpack npm-run-all \
  && rm -f -R .git \
  && rm -rf -R src \
  && mkdir logs \
  && rm -rf /app/node_modules \
  && npm install --production \
  && npm cache clean --force \
  && apk --no-cache add curl \
  && rm -rf /var/cache/apk/*

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s CMD curl --retry 2 --retry-connrefused http://localhost:3001/health || exit 1
CMD ["node", "./dist/server/server.js"]
