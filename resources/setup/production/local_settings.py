DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u^5c&p-v-w@9kc_ohbd757v+@l-5sm&mnrohw$(bnu7=-@dt&)'

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