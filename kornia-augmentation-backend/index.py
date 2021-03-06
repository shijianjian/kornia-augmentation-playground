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


@app.route('/', methods=['GET'])
def root():
    return app.send_static_file('index.html')


@app.route('/augmentation/compute', methods=['POST'])
def augmentation_compute():
	in_file = request.files['file']
	in_setting = eval(request.form['setting'])
	in_device, in_dtype, in_batchsize = request.form['device'], request.form['dtype'], eval(request.form['batchsize'])
	print(in_setting, in_device, in_dtype, in_batchsize)
	image = skio.imread(in_file)[:, :, :3]
	image_tensor = create_image_tensor(image, num=in_batchsize, device=in_device, dtype=in_dtype) / 255.
	pip = create_pipeline(in_setting)
	res = pip(image_tensor)
	def _retreive_params(instance):
		# if the operation is not an augmentation object
		return instance._params if hasattr(instance, '_params') else {'batch_prob': torch.Tensor([True] * in_batchsize)}
	params = {se['name']: _retreive_params(aug) for aug, se in zip(pip, in_setting)}
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


@app.route('/config/devices', methods=['GET'])
def get_avaliable_devices():
	_list = ['CPU']
	if torch.cuda.is_available():
		_list.append('GPU')
	try:
		import torch_xla
		device = xm.xla_device()
		torch.tensor(1, device=device)
		_list.append('TPU')
	except:
		print("`torch_xla` is not installed or TPU not avaliable. Cannot check avaliability.")
	return jsonify({"devices": _list})


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
		to_apply = aug_value['batch_prob']
		for key, value in aug_value.items():
			# Special case
			if aug_name == 'ColorJitter' and key == 'order' and key != 'batch_prob':
				value = [value] * np.array(to_apply).sum()
			value = iter(value)
			for idx, if_to in enumerate(to_apply):
				if idx not in dic:
					dic.update({idx: {}})
				dic2 = dic[idx]
				if aug_name not in dic2:
					dic2.update({aug_name: {}})
				dic3 = dic2[aug_name]
				if key == 'batch_prob' or if_to:
					dic3.update({key: next(value)})
				dic2.update({aug_name: dic3})
				dic.update({idx: dic2})
	return dic


if __name__ == '__main__':
	app.run(port=7000, debug=True)
