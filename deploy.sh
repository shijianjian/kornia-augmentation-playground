#!/bin/bash
cd kornia-augmentation-frontend
ng build --prod --build-optimizer --baseHref="/static/"
mv dist ..
cd ..
cp -r kornia-augmentation-backend/* dist/