import torch
import kornia
from kornia.augmentation import *
from kornia.filters import MotionBlur


def get_device_by_string(device):
    if device == 'CPU': return torch.device('cpu')
    if device == 'GPU': return torch.device('cuda')
    if device == 'TPU':
        try:
            import torch_xla
            return xm.xla_device()
        except:
            print("load TPU failed. falls back to CPU.")
            return torch.device('cpu')
    raise ValueError(f"load {device} failed")


def get_device_by_dtype(dtype):
    if dtype == 'float16': return torch.float16
    if dtype == 'float32': return torch.float32
    if dtype == 'float64': return torch.float64
    raise ValueError(f"load {dtype} failed")


def create_pipeline(settings):
    pipeline = []
    for setting in settings:
        name = setting['name']
        kwargs = setting['kwargs']
        pipeline.append(globals()[name](**kwargs))
    return torch.nn.Sequential(*pipeline)


def create_image_tensor(image, num, device, dtype):
    return kornia.image_to_tensor(image, keepdim=False).repeat(num, 1, 1, 1).to(
        device=get_device_by_string(device), dtype=get_device_by_dtype(dtype))


def generate_pipeline_code(settings):
    code = ""
    for setting in settings:
        name = setting['name']
        kwargs = setting['kwargs']
        k_string = ', '.join('%s=%r' % x for x in kwargs.items())
        code += f"\n    {name}({k_string}),"

    code = f"nn.Sequential({code[:-1]}\n)"
    return code


if __name__ == '__main__':
    settings = [
        {
            "name": 'RandomHorizontalFlip',
            "kwargs": {
                "p": 1.0
            }
        }, 
        {
            "name": 'RandomVerticalFlip',
            "kwargs": {
                "p": 1.0
            }
        }
    ]
    print(create_pipeline(settings))
    print(generate_pipeline_code(settings))
