# radar-saude
Radar saude job test 

Lucas Goulart

Para rodar o servidor em docker, utilizar os seguintes comandos nos respectivos repositórios:


BACKEND:

```shell
docker build -t back-end-radar .
```

```shell
docker run -d -p 3000:3000 back-end-radar
```



FRONTEND:

```shell
docker build -t front-end-radar .
```

```shell
docker run -d -p 3001:3001 front-end-radar
```



