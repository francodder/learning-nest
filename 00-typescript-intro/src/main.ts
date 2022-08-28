import "./style.css";

import { AxiosAdapter } from "./api/axios.adapter";
import { FetchAdapter } from "./api/fetch.adapter";

import { Pokemon } from "./intro/02-getters";
import { PokemonInjection } from "./intro/03-injection";
import { myPrinter } from "./intro/04-decorators";
import { snorlak } from "./intro/05-decorators2";

const charizard = new Pokemon(1, "charizard");
// charizard.scream();
// charizard.speak();

const pikachu = new Pokemon(2, "pikachu");
// pikachu.scream();
// pikachu.speak();
const moves = await pikachu.getMoves();
// console.log(moves);

const fetchAdapter = new FetchAdapter();
const axiosAdapter = new AxiosAdapter();

const doraemon = new PokemonInjection(3, "doraemon", axiosAdapter);
const moves2 = await doraemon.getMoves();
// doraemon.scream();
// console.log(moves2);

// myPrinter.print();

snorlak.speak();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1> Hola Vite!</h1>
  </div>
`;
