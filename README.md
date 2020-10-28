# Kornia Augmentation Playground

Demo app for experimenting data augmentations. [Demo URL](https://kornia-augmentation-playground.herokuapp.com/).

![-](./misc/demo.gif)

## How to run
### Local build
```bash
$ cd kornia-augmentation-frontend
$ npm install
$ cd ..
$ sh deploy.sh
$ cd dist
$ gunicorn -w 4 -b 0.0.0.0:7000 index:app
```

### Docker
Passing a PORT env variable. It will perform an automatic binding.
```bash
$ docker build PORT=7000 -t kornia-app:v0.3 .
```

## Development
### Frontend Running
```bash
$ npm install
$ ng serve
```

### Backend Running
In another terminal:
```bash
$ cd simple_backend
$ pip install -r requirements.txt
$ python index.py
```

## Note

The future direction shall be:
1.  supporting all 3D augmentations / visualizations
2.  supporting in-browser computation by generating ONNX model