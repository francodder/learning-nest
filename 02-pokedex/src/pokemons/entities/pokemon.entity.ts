import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  /* Here we can define all schema prop arguments */
  @Prop({
    required: [true, 'name is required'],
    unique: true,
    index: true, // Makes this props faster to match on search
  })
  name: string;

  @Prop({
    required: [true, 'no field is required'],
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

