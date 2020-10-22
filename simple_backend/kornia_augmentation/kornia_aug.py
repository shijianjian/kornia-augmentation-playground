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


if __name__ == '__main__':
    x = create_pipeline([
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
    ])
    print(x)
