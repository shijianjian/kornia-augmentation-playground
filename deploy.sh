#!/bin/bash
ng build --prod --build-optimizer --baseHref="/static/"
cp -r simple_backend/* dist/
cd dist
gunicorn -w 4 -b 127.0.0.1:7000 index:app