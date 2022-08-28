import { AxiosAdapter } from "../api/axios.adapter";
import { PokemonAPI } from "../interfaces/pokeapi-response.interface";
import { HttpAdapter } from "../interfaces/httpAdapter.interface";

export class PokemonInjection {
  constructor(
    readonly id: number,
    public name: string,
    private readonly http: HttpAdapter
  ) {}

  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name} ${this.name}`);
  }

  async getMoves() {
    const data = await this.http.get<PokemonAPI>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`
    );
    return data.moves;
  }
}
