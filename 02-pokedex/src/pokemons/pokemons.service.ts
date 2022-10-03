import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonsService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleMongoErrors(error);
    }
  }

  findAll(query: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = query;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .select('-__v')
      .sort({ no: 1 });
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Can't find a pokemon with name, no or id [${term}]`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemonDB = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemonDB.updateOne(updatePokemonDto);
      return { ...pokemonDB.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleMongoErrors(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new NotFoundException(`Can't find a pokemon with ID [${id}]`);

    return { message: `Deleted pokemon with ID [${id}]` };
  }

  async populateDB(
    pokemons: CreatePokemonDto[],
    deletePrevious: boolean = false,
  ) {
    try {
      if (deletePrevious) await this.pokemonModel.deleteMany();
      const result = await this.pokemonModel.insertMany(pokemons);
      return result;
    } catch (error) {
      this.handleMongoErrors(error);
    }
  }

  private handleMongoErrors(error: any) {
    console.log(error);

    if (error.code === 11000) {
      throw new BadRequestException(
        `Duplicated key in DB - { ${Object.entries(error.keyValue)[0][0]}: ${
          Object.entries(error.keyValue)[0][1]
        } }`,
      );
    }

    throw new InternalServerErrorException(
      'Cannot complete the task, check the logs',
    );
  }
}

