import io
import base64
from flask import Flask
from flask import request, send_file, jsonify
from flask_cors import CORS
from skimage import io as skio
import kornia
import torch
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
	params = {se['name']: aug._params for aug, se in zip(pip, in_setting)}
	out = tensor_to_images(res)
	out_param = decode_array_list(params)
	return jsonify({"images": out, "params": read_dict_params(out_param, num=8)})

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


def decode_array_list(array):
	if isinstance(array, (list, tuple)):
		return [decode_array_list(x) for x in array]
	if isinstance(array, (dict)):
		return {k: decode_array_list(v) for k, v in array.items()}
	if isinstance(array, (torch.Tensor,)):
		return array.cpu().numpy().tolist()
	if isinstance(array, (np.array,)):
		return array.tolist()


def read_dict_params(params, num=8):
	dic = {}
	for aug_name, aug_value in params.items():
		for key, value in aug_value.items():
			if len(value) != num:
				value = [value] * 8
			for idx, v in enumerate(value):
				if idx not in dic:
					dic.update({idx: {}})
				dic2 = dic[idx]
				if aug_name not in dic2:
					dic2.update({aug_name: {}})
				dic3 = dic2[aug_name]
				dic3.update({key: v})
				dic2.update({aug_name: dic3})
				dic.update({idx: dic2})
	return dic


if __name__ == '__main__':
	app.run(port=7000, debug=True)
