#!/bin/bash
cd kornia-augmentation-frontend
ng build --prod --build-optimizer --baseHref="/static/"
mv dist ..
cd ..
cp -r kornia-augmentation-backend/* dist/
cd dist
gunicorn -w 4 -b 127.0.0.1:7000 index:app