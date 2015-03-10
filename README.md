### Run command "sudo npm i" for install necessary node modules.

Руководство по настройке
===================================

Cписок необходимого ПО
------------
для frontend/backend/api
```
* OS: Ubuntu (Debian)
* >= PHP 5.4
* Nginx
* php-fpm
* git
* composer
* Bower (устанавливается через npm, для этого нужно утстановить nodejs)
* GD lib (FreeType support)
* sendmail
* Memcache and APC
* php5-curl
* php5-mcrypt
* ngx_http_rewrite_module
```
для баз данных:
```
* >= PostgreSql 9.0
* >= Mongodb 3.0
* PostGis
* PL/Proxy
* PgBouncer
```

Рекомендуемые настройки Nginx
------------
PHP должен быть установлен как [FPM SAPI](http://php.net/manual/ru/install.fpm.php) для Nginx.
Используя следующие параметры Nginx необходимо заменить `path/to/frontend/web` на корректный путь к `frontend/web` и
`mysite.local` на ваше имя хоста (аналогично для `path/to/backend/web`).

```
server {
    charset utf-8;
    client_max_body_size 128M;

    listen 80; ## listen for ipv4
    #listen [::]:80 default_server ipv6only=on; ## слушаем ipv6

    server_name mysite.local;
    root        /path/to/basic/web;
    index       index.php;

    access_log  /path/to/project/log/access.log main;
    error_log   /path/to/project/log/error.log;

    location / {
        # Перенаправляем все запросы к несуществующим директориям и файлам на index.php
        try_files $uri $uri/ /index.php?$args;
    }

    # раскомментируйте строки ниже во избежание обработки Yii обращений к несуществующим статическим файлам
    #location ~ \.(js|css|png|jpg|gif|swf|ico|pdf|mov|fla|zip|rar)$ {
    #    try_files $uri =404;
    #}
    #error_page 404 /404.html;

    location ~ \.php$ {
        include fastcgi.conf;
        fastcgi_pass   127.0.0.1:9000;
        #fastcgi_pass unix:/var/run/php5-fpm.sock;
    }

    location ~ /\.(ht|svn|git) {
        deny all;
    }
}
```

Используя данную конфигурацию установите `cgi.fix_pathinfo=0` в `php.ini` чтобы предотвратить лишние системные
вызовы `stat()`.

При использовании HTTPS необходимо задавать `fastcgi_param HTTPS on;` чтобы Yii мог корректно определять защищенное
соединение.

Установка проекта
---------------

Перед установкой необходимо запустить команду, которая установит плагин для управления зависимостями пакетов bower и npm через Composer 
   composer global require "fxp/composer-asset-plugin:1.0.0"

1. Клонируем проект из git: `git clone git@bitbucket.org:sailty/yachts.git`
2. Переходим в папку проекта: `cd yachts`
3. Запускаем инициализацию проекта командой `php init` где выбираем среду `Production`
4. Если необходимо, редактируем настройки базы данных в файле `common/config/main-local.php`
```
'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'pgsql:host=localhost;dbname=yach',
            'username' => 'username',
            'password' => 'password',
            'charset' => 'utf8',
            'schemaMap' => [
                'pgsql'=> [
                    'class'=>'yii\db\pgsql\Schema',
                    'defaultSchema' => 'public'
                ]
            ],
        ],
        'mongodb' => [
            'class' => '\yii\mongodb\Connection',
            'dsn' => 'mongodb://username:password@localhost:27017/base_name',
        ],
    ],
```

5. Для создания таблиц запускаем команду: `php migrate` (при запросе - пишем `yes`)
6. Устанвливаем  
7. 

```
params-local    
    'hostName' => 'http://yach.com/',
    'frontendUrl' => 'http://yach.com/',
    'backendUrl' => 'http://admin.yach.com/',
    's3_key' => '',
    's3_secret' => '',
    's3_bucket' => '',
    's3_url' => 'https://sailty-staging.s3.eu-central-1.amazonaws.com/',
```    
