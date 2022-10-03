import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interfaces/poke-api-resp.interface';
import { CreatePokemonDto } from '../pokemons/dto/create-pokemon.dto';
import { PokemonsService } from '../pokemons/pokemons.service';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private pokemonsService: PokemonsService,
  ) {}

  async executeSeed() {
    const data = await this.http.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const pokemons: CreatePokemonDto[] = data.results.map(({ name, url }) => {
      const urlSegments = url.split('/');
      return {
        name,
        no: +urlSegments[urlSegments.length - 2],
      };
    });

    const result = await this.pokemonsService.populateDB(pokemons, true);
    return result;
  }
}

