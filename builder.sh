#!/usr/bin/env bash

stage=$1

# Default to prelive
if [ -z $stage ]; then
    stage="development"  	
fi;

if ! which yarn &> /dev/null; then
    echo "is yarn available?"
    npm install -g yarn --production
fi

if [[ $stage == *"prod"* ]]; then 
    echo 'Building production'
    yarn install --production
fi

PACKAGE_VERSION=$(node -pe "require('./package.json').version")
echo "Package: $PACKAGE_VERSION"

# deploy:prod  
yarn $stage; 

if [[ $stage == *"prod"* ]]; then 
  echo 'Updating version for production'
  curl -d "ver=$PACKAGE_VERSION&rk=5d71349d1755e" https://api.localsurveyorsdirect.co.uk/api/v1.0/updateversion
fi
