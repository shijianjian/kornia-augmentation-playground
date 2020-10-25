FROM nikolaik/python-nodejs:python3.7-nodejs12-slim

# Install angular dependencies
RUN yarn global add @angular/cli@1.2.6

ADD . /app
WORKDIR /app

RUN cd kornia-augmentation-frontend && npm i && cd ..
RUN bash deploy.sh

# Install python dependencies
RUN pip install -r kornia-augmentation-backend/requirements.txt

EXPOSE 7000

WORKDIR /app/dist
CMD gunicorn -w 4 -b 127.0.0.1:7000 index:app
