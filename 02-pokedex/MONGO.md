1 - First you need to create a mongDB, it can be created via Atlas or locally via docker.

2 - Once the DB is created, you have to install mongoose and @nestjs/mongoose module.

```
$ npm i @nestjs/mongoose mongoose
```
3 - Connect the MongoDB in your main module

```
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
```

4 - Define your entities / schemas

```
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {

  @Prop() // Here we can define all schema prop arguments
  name: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
```

5 - Import your schema in module the where you create the entity / schema

```
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
})
export class PokemonsModule {}
```

6 - Inject your model in your service

```
constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
) {}
```

7 - Do de DB operations you want with your model