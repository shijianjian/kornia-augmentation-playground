import io
import base64
from flask import Flask
from flask import request, send_file, jsonify
from flask_cors import CORS
from skimage import io as skio
import kornia
import numpy as np
from PIL import Image

from kornia_augmentation import create_pipeline, create_image_tensor, generate_pipeline_code

app = Flask(__name__)
# TODO: Remove the following after https://github.com/pallets/flask/issues/2549
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
CORS(app)


@app.route("/")
def helloWorld():
    return "Hello, cross-origin-world!"


@app.route('/augmentation/compute', methods=['POST'])
def augmentation_compute():
	in_file = request.files['file']
	in_setting = eval(request.form['setting'])
	print(in_setting)
	image = skio.imread(in_file)[:, :, :3]
	image_tensor = create_image_tensor(image, num=8) / 255.
	pip = create_pipeline(in_setting)
	res = pip(image_tensor)
	out = tensor_to_images(res)
	return jsonify(out)

@app.route('/augmentation/getcode', methods=['POST'])
def get_augmentation_code():
	print(request.form['setting'])
	in_setting = eval(request.form['setting'])
	print(in_setting)
	res = generate_pipeline_code(in_setting)
	return jsonify({"code": res})


def tensor_to_images(tensor):
	out = []
	for t in tensor:
		arr = (kornia.tensor_to_image(t) * 255).astype('uint8')
		img = Image.fromarray(arr.astype("uint8"))
		rawBytes = io.BytesIO()
		img.save(rawBytes, "PNG")
		rawBytes.seek(0)  # return to the start of the file
		out.append(base64.b64encode(rawBytes.read()).decode('utf-8'))
	return out


if __name__ == '__main__':
	app.run(port=7000, debug=True)
