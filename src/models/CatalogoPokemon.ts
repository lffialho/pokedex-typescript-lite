import { PokemonResumo } from "./Pokemon"

export class CatalogoPokemon {
  private pokemons: PokemonResumo[]

  constructor(pokemonsIniciais: PokemonResumo[] = []) {
    this.pokemons = pokemonsIniciais
  }

  adicionar(pokemon: PokemonResumo): void {
    this.pokemons.push(pokemon)
  }

  listar(): PokemonResumo[] {
    return [...this.pokemons]
  }

  remover(id: number): void {
    this.pokemons = this.pokemons.filter((item) => item.id !== id)
  }

  limpar(): void {
    this.pokemons = []
  }
}