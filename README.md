# Для разработки
Предварительно нужно создать alias для localhost (файл /etc/hosts):
- 127.0.0.1 template-basic.agg.loc
- 127.0.0.1 api.agg.loc
- 127.0.0.1 redis

# Extensions VSC
- eg2.tslint
- esbenp.prettier-vscode
- christian-kohler.path-intellisense
- codezombiech.gitignore
- PeterJausovec.vscode-docker
- patrys.vscode-code-outline
- plievone.vscode-template-literal-editor
- blanu.vscode-styled-jsx

# template-basic
Basic React.js shop template

# build comments
``` npm run build ```

# run production | development | test
Чтобы запустить сервер на продакшен:
``` node ./bin/cluster.js ```

Чтобы запустить сервер в режиме development с HMR (Hot Module Reload):
``` npm run watch ```

Чтобы запустить тесты:

``` npm run test ```

Without collecting coverage:
``` npm run test-simple ```

# run in docker
`docker-compose build && docker-compose up` - it displays the console log

# enter docker container
``` docker ps ```
``` docker exec -it HASH_DOCKER_CONTAINER_ID bash ```

# remove all stopped containers
``` docker rm $(docker ps -a -q) ```
``` docker rmi $(docker images -q) ``` - удаляем образы

`docker ps`

``` docker build -f .\Dockerfile . ```
``` docker run container_hash_after_build ```

# rebuild docker containers without cache
``` docker-compose rm ``` 
``` docker-compose build --no-cache ``` 

# как остановить все контейнеры
``` docker-compose down ```

# чудо команда, подчищает всё капитально, чистая магия - в случае непонятной фигни в докере запускай сперва её
``` docker system prune -a -f ```
(prune - Remove unused data, -a - Remove all unused images not just dangling ones).

# online markdown
http://rexxars.github.io/react-markdown/

# logger (winston)
Что бы увидеть файлы логов, нужно создать в корне проекта папку logs (см. конфиг)
- https://github.com/winstonjs/winston/blob/master/docs/transports.md
- https://github.com/winstonjs/winston
- https://github.com/winstonjs/winston-daily-rotate-file

# Как добавить/изменить значения в global.yml?

Нужно поправить: сам `configs/global.yml`, `core/interfaces/Alicanto.d.ts`, `configs/validators/globalSchemaJoi.ts`
 
Пояснение. В режиме разработки, global.yml подключается локально или загружается из API в зависимости от NODE_ENV:

```
const ui = ConfigHelper.isDev() ? require('src/configs/global.yml').ui : config.ui;
```

..., но если нужно залить данные на бэкенд, выполните: 

``` $ node bin/updateconf.js ```
