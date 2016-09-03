import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or '123456'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DB_URL') or 'sqlite:///' + os.path.join(basedir, 'dev-db.sqlite')

config = {
    'development': DevelopmentConfig,

    'default': DevelopmentConfig
}
