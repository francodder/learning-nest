import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonsModule } from './pokemons/pokemons.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvironmentConfig } from './config/app.config';
import { envValitadion } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvironmentConfig],
      validationSchema: envValitadion,
    }), //! Muest be first

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    /* Nest hast adapters for most common database systems like Mongo and Postgres
       this makes easy to integrate these sistems with nest, reducing de boilerplate coede
       ? forRoot() receive the same arguments as mongoose.conenct()
    */
    MongooseModule.forRoot(process.env.MONGODB),

    PokemonsModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}

