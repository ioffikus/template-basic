#!/usr/bin/env bash

JQ="jq --raw-output --exit-status"

SHA1=$1-$CIRCLE_BUILD_NUM
APP_NAME=$2
APP_ENV=$1
FULL_NAME=$APP_NAME:$SHA1
FAMILY=$3

configure_aws_cli(){
	aws --version
	aws configure set default.region eu-west-1
	aws configure set default.output json
}

deploy_cluster() {
    
	echo "image name:"
    echo $FULL_NAME

    make_task_def

    register_definition
    if [[ $(aws ecs update-service --cluster "$FAMILY" --service "$FAMILY" --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    # wait
    for attempt in {1..20}; do
        if stale=$(aws ecs describe-services --cluster "$FAMILY" --services "$FAMILY" | \
                       $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
            echo "Waiting for stale deployments:"
            echo "$stale"
            sleep 3
        else
            echo "Deployed!"
            return 0
        fi
    done
    echo "Service update took too long."
    return 0
}

make_task_def(){
    aws ecs describe-task-definition --task-definition $FAMILY | jq --arg x $FULL_NAME ' .taskDefinition
                                                                                              | del(.status)
                                                                                              | del(.taskDefinitionArn)
                                                                                              | del(.revision)
                                                                                              | del(.requiresAttributes)
                                                                                              | .containerDefinitions[0].image = ("924812432087.dkr.ecr.eu-west-1.amazonaws.com/"+$x)' > new-task-definition.json

}

push_ecr_image(){
	eval $(aws ecr get-login --no-include-email --region eu-west-1)
	docker tag $APP_NAME:$SHA1 $AWS_ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com/$FULL_NAME
	docker push $AWS_ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com/$FULL_NAME
}

register_definition() {

    if revision=$(aws ecs register-task-definition --cli-input-json file://new-task-definition.json | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
