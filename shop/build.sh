#!/bin/bash
build_frontend()
{
  cd public && npm install && npm run build
}

build_server()
{
  bundler_present="$(gem query --name-matches 'bundler' --installed)"
  if [ $bundler_present == "false" ]
  then
    gem install bundler
  fi
  bundle install
}

while [[ $# > 1 ]]
do
key="$1"

case $key in
    -b|--build)
    BUILD="$2"
    shift
    ;;
    *)
    ;;
esac
shift
done

if [ -z "$BUILD" ]
then
  build_frontend
  build_server
else
  if [ $BUILD == "frontend" ]
  then
    build_frontend
  elif [ $BUILD == "server" ]
  then
    build_server
  else
    echo "ERROR: No build task for: ${BUILD}"
  fi
fi
