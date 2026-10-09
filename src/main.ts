import { BoxService } from "./services/BoxService"

async function main(): Promise<void> {
  const box = new BoxService();
  const pokemons = await box.carregar()

  console.log(pokemons)
}

main()