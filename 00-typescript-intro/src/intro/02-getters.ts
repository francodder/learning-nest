import axios from "axios";
import { Move } from "../interfaces/pokeapi-response.interface";

export class Pokemon {
  constructor(readonly id: number, public name: string) {}

  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name} ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`
    );
    return data?.moves;
  }
}
