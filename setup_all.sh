#!/bin/bash

cd cart && npm install && cd ..
cd pixel && npm install && npm run build && cd ..
cd scrapbook/server && bundle install && cd .. && npm install && cd ..
cd shop/server && bundle install && cd public && npm install && npm run build && cd ../../..
cd todo && npm install && npm run build && cd ..
cd wtf && npm install && npm run build && cd ..
