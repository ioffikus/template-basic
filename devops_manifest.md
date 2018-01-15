# Env Variables
Запуск **боевого** контейнера (для контейнера разработки это не нужно) с приложением должно сопровождаться настройкой окружения. Все инфраструктурные данные вынесены в переменные окружения (а так же продублированы в ./src/configs/common.js):

## Env Variables
- **NODE_ENV** - переменная рабочего окружения (production, test, development, unstable, staging)
- **WEB_HOST** - хост сервера node.js (по умолчанию localhost)
- **WEB_PORT** - порт сервера node.js (по умолчанию 3001)
- **WEB_COOKIE_SECRET** - секретная строка для cookies
- **WEB_COOKIE_MAX_AGE** - время жизни cookies (по умолчанию 7 дней)
- **WEB_COOKIE_LOCALE_MAX_AGE** - время жизни cookies содержащих информацию о языковых настройках пользователя (по умолчанию 10 лет) 

## API
- **API_HOST** - хост сервера API (по умолчанию http://app.agg.loc)
- **API_PORT** - порт сервера API (по умолчанию 8000)
- **API_PATH** - путь до API (по умолчанию '/v1/shop')
- **API_PROTOCOL** - протокол сервера API

## Redis
- **REDIS_HOST** - host сервера redis
- **REDIS_PORT** - порт redis (по умолчанию 6379)

## Sentry
- **SENTRY_KEY_REACT** - sentry ключ для react приложения
- **SENTRY_KEY_NODE** - sentry ключ для node.js
- **SENTRY_PROJECT_ID** - sentry идентификатор проекта

## Static data
- **STATIC_PROTOCOL** - static server протокол (по умолчанию http)
- **STATIC_HOST** - static server хост (по умолчанию static.agg.loc)
- **STATIC_PORT** - static server порт (по умолчанию 8888)

## Server Auth
- **INTERNAL_API_LOGIN** - frontend API login (по умолчанию test_login)
- **INTERNAL_API_PASSWORD** - frontend API password (по умолчанию Te$tPasSw0rD)

## Для сборки клиентского build.js в окружении должны быть переменные
- **STATIC_PROTOCOL**
- **STATIC_HOST**
- **STATIC_PORT**
- **NODE_ENV**
- **REACT_API_PATH** - задан по умолчанию как '/api', можно не передавать
- **SENTRY_KEY_REACT**
- **SENTRY_PROJECT_ID**

## Logger
- **LOG_FILE_PATH** - по умолчанию: './logs/log'
- **LOG_DATE_PATTERN** - маска используемая в имени лог файла, по умолчанию: 'yyyy-MM-dd.'
- **LOG_FILE_MAX_SIZE** - максимальный размер лог файла, по умолчанию: 500000 байт
- **LOG_MAX_FILES** - максимальное количество файлов
- **LOG_LEVEL** - уровень логирования, по умолчанию: 'error', подробнее https://github.com/winstonjs/winston

## Amazon X-Ray
- **AWS_XRAY_TRACING_NAME** - сегмент XRay, по умолчанию: 'ashop-web-unstable-segment'

## Amazon AWS
- **AWS_ACCESS_KEY_ID**
- **AWS_SECRET_ACCESS_KEY**
- **AWS_REGION** - по умолчанию: 'eu-west-1'

## Config
- **APP_CONFIGURATIONS_PATH** - endpoint для загрузки global.yml
