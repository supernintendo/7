#!/bin/bash

cd cart && sh build.sh && cd ..
cd clock && npm install && cd ..
cd pixel && npm install && npm run build && cd ..
cd todo && npm install && npm run build && cd ..
cd wtf && npm install && npm run build && cd ..
