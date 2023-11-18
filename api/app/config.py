import os


class Config():
    env = os.getenv('APP_ENV', 'test')
