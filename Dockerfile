FROM nikolaik/python-nodejs:python3.7-nodejs14

# Install angular dependencies
RUN yarn global add @angular/cli@1.2.6

ADD . /app
WORKDIR /app

RUN cd kornia-augmentation-frontend && npm i && cd ..
RUN bash deploy.sh

# Install python dependencies
RUN pip install -r kornia-augmentation-backend/requirements.txt

EXPOSE $PORT

WORKDIR /app/dist
CMD gunicorn -b 0.0.0.0:$PORT index:app
