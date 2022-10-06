<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# How to run the project

1 - Clone the repository
2 - Install dependencies
```
npm install
```
3 - Install Nest CLI
```
npm i -g @nestjs/cli
```
4 - Run the database
```
docker-compose up -d
```
5 - Clone __.env.template__ file and rename it to __.env__

6 - Complete environment vars defined in __.env__

7 - Run the backend
```
npm run start:dev
```
8 - Populate DB
<br />
```
GET http://localhost:3000/api/v1/seed
```
<small>This action deletes previous registers</small>

# Production Build
1. Create file __.env.pro__
2. Define environment vars
3. Create the new image
```
docker-compose -f docker-compose.prod.yaml up --build
```
If you already created the image, use this command
```
docker-compose -f docker-compose.prod.yaml up -d
```
