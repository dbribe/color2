DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'tsx#@-o-+%*%a0be$rh+@otxverack01#k^tj^piv!eaeaqs_g'

ALLOWED_HOSTS = ['']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
        'CONN_MAX_AGE': 600,
    },
}