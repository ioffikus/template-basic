#!/bin/bash

case $CIRCLE_BRANCH in
      master)
		NODE_ENV="production"
		SENTRY_KEY_REACT="498d2a38cd254870a60c5f508195f26e"
		SENTRY_PROJECT_ID="202351"
		STATIC_PROTOCOL="https"
		STATIC_HOST="d1d77rpo4rutnz.cloudfront.net"
		STATIC_PORT="443"
		SHA1=production-$CIRCLE_BUILD_NUM
		APP_NAME="template-basic"
        ;;
      develop)
		NODE_ENV="unstable"
		SENTRY_KEY_REACT="7b0252f0dd164e29ba6574b54a453f62"
		SENTRY_PROJECT_ID="202348"
		STATIC_PROTOCOL="https"
		STATIC_HOST="d3aee68pyq248w.cloudfront.net"
		STATIC_PORT="443"
		SHA1=development-$CIRCLE_BUILD_NUM
		APP_NAME="template-basic"
        ;;
        *)
		NODE_ENV="unstable"
		SENTRY_KEY_REACT="7b0252f0dd164e29ba6574b54a453f62"
		SENTRY_PROJECT_ID="202348"
		STATIC_PROTOCOL="https"
		STATIC_HOST="d3aee68pyq248w.cloudfront.net"
		STATIC_PORT="443"
		SHA1=development-$CIRCLE_BUILD_NUM
		APP_NAME="template-basic"
        ;;
esac

echo "vars:"
echo $CIRCLE_BRANCH
echo $NODE_ENV
echo $SHA1

eval $(aws ecr get-login --no-include-email --region eu-west-1)

docker build --rm=false --no-cache \
    --build-arg STATIC_HOST=$STATIC_HOST \
    --build-arg STATIC_PORT=$STATIC_PORT \
    --build-arg STATIC_PROTOCOL=$STATIC_PROTOCOL \
    --build-arg NODE_ENV=$NODE_ENV \
    --build-arg SENTRY_KEY_REACT=$SENTRY_KEY_REACT \
    --build-arg SENTRY_PROJECT_ID=$SENTRY_PROJECT_ID \
    --build-arg CIRCLE_BUILD_NUM=$CIRCLE_BUILD_NUM \
    -t $APP_NAME:$SHA1 . | cat

docker run --network container:redis -d -e REDIS_HOST='localhost' -e AWS_XRAY_TRACING_NAME='template-basic' --name tmpl $APP_NAME:$SHA1
