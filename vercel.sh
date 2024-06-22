#!/bin/bash

if [[ $VERCEL_ENV == "production"  ]] ; then
  npm run build
else
  npm run build
fi

npm run db:migrate
npm run db:seed
