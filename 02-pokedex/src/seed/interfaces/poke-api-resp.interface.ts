// Generated by https://quicktype.io

export interface PokeAPIResponse {
  count: number;
  next: string;
  previous: null;
  results: PokemonApi[];
}

export interface PokemonApi {
  name: string;
  url: string;
}
