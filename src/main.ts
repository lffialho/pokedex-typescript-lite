import { CatalogoPokemon } from "./models/CatalogoPokemon"
import { PokemonResumo } from "./models/Pokemon"

const pikachu: PokemonResumo = {
  id: 25,
  nome: "pikachu",
  tipos: ["electric"],
  altura: 4,
  peso: 60,
  hp: 35,
  ataque: 55,
  defesa: 40,
}

const catalogo = new CatalogoPokemon()

console.log(catalogo.adicionar(pikachu))
console.log(catalogo.adicionar(pikachu))
console.log(catalogo.listar().length)
console.log(catalogo.remover(25))
console.log(catalogo.remover(25))