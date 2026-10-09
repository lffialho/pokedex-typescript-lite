import { PokeApiService } from "./services/PokeApiService"

async function main(): Promise<void> {
  const pokeApi = new PokeApiService();

  console.log(await pokeApi.buscarPokemon("pikachu"))
  console.log(await pokeApi.buscarPokemon("pokemon-inexistente"))
  console.log(await pokeApi.buscarPokemon("   "))
}

main()