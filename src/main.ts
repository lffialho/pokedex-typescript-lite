import { PokeApiService } from "./services/PokeApiService"

async function main(): Promise<void> {
  const pokeApi = new PokeApiService()
  const pikachu = await pokeApi.buscarPokemon("pikachu")

  console.log(pikachu)
}

main()