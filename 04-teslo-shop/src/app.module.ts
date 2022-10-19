import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envSchema } from "./config/env.schema";
import { ProductsModule } from "./products/products.module";
import { CommonModule } from "./common/common.module";
import { SeedModule } from "./seed/seed.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      /* Updates the database every time an entity change. 
         It is not recommended in production, it must be handled with migrations */
      synchronize: true,
      // Syncronize entities
      autoLoadEntities: true,
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
