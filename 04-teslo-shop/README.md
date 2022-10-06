<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clone the project

2. Install dependencies

```
   npm install
```

3. Clone **.env.template** file and rename it to **.env**

4. Complete the vars values from **.env** file

5. Run the DB

```
   docker-compose up -d
```

6. Configure your **app.module.ts**

```
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      /* Upgrade the database every time an entity change.
         It is not recommended in production, it must be handled with migrations */
      synchronize: true,
      // Syncronize entities
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
