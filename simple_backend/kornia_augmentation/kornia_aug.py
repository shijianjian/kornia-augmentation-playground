import torch
import kornia
from kornia.augmentation import *


def create_pipeline(settings):
    pipeline = []
    for setting in settings:
        name = setting['name']
        kwargs = setting['kwargs']
        pipeline.append(globals()[name](**kwargs))
    return torch.nn.Sequential(*pipeline)


def create_image_tensor(image, num: int = 8):
    return kornia.image_to_tensor(image, keepdim=False).repeat(num, 1, 1, 1)


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
