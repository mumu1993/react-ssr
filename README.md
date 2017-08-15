# fatu-web

### environment

node version >= 7.0

### Install and run:

- run for development

```bash
npm install
npm start
```

- build

```bash
npm run build
```

- run for production

```bash
npm install
npm run start:prod
```

- run test

```bash
npm test
```

### deploy

1.安装依赖

```bash
npm install
```

2.编译项目

```bash
npm run build
```

编译后的文件目录为根目录下``build``  
站点使用端口可在``/config/index.js``文件中，``port``节点中配置    

3.部署站点

切换到项目根目录，运行如下命令开始部署

```bash
pm2 start ./pm2.json
```

若``pm2``未安装，使用如下命令进行安装  

```
npm install pm2 -g
```

部署完成后，访问``http://ip:port/``查看是站点否正常  

4.配置反向代理

使用自定义域名进行访问时，可使用``nginx``或``openresty``配置反向代理,配置如下  

```
server {
    listen       80;
    server_name  fatu.com;

    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:7000;
    }
}
```

可开启``nginx``或``openresty``的``gzip``功能，压缩静态资源，配置如下  

```
gzip on;
gzip_min_length 1k;
gzip_buffers 16 64k;
gzip_http_version 1.1;
gzip_comp_level 5;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary on;
gzip_disable  "msie6";
```
