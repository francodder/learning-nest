# Steps to connect Postgress & TypeORM

1. Downolad the posgres image from docker (v14.3)
2. Create the docker container for the DB in **docker.compose.yml** file
3. Run the DB container

```
docker-compose up -d
```

4. Create **.env** file and declare necesary variables for posgress: host, port, name, password, username

5. install necesary dependencies

```
npm i @nestjs/typeorm pg
```
