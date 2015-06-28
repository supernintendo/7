#!/bin/bash

cd pixel && npm install && npm run build && cd ..
cd scrapbook/server && bundle install && cd .. && npm install && cd ..
cd shop && bundle install && cd public && npm install && npm run build && cd ../..
cd time && npm install && cd ..
cd todo && npm install && npm run build && cd ..
cd wtf && npm install && npm run build && cd ..
