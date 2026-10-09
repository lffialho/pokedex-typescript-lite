import { PokemonResumo } from "./Pokemon"

export class CatalogoPokemon {
  private pokemons: PokemonResumo[]

  constructor(pokemonsIniciais: PokemonResumo[] = []) {
    this.pokemons = pokemonsIniciais
  }

  adicionar(pokemon: PokemonResumo): boolean {
    const jaExiste = this.pokemons.find((item) => item.id === pokemon.id)

    if (jaExiste !== undefined) {
      return false
    }

    this.pokemons.push(pokemon)
    return true
  }

  listar(): PokemonResumo[] {
    return [...this.pokemons]
  }

  remover(id: number): boolean {
    const existe = this.pokemons.find((item) => item.id === id)

    if (existe === undefined) {
      return false
    }

    this.pokemons = this.pokemons.filter((item) => item.id !== id)
    return true
  }

  limpar(): void {
    this.pokemons = []
  }
}