import { TerminalController } from "./controllers/TerminalController"
import { CatalogoPokemon } from "./models/CatalogoPokemon"
import { BoxService } from "./services/BoxService"
import { PokeApiService } from "./services/PokeApiService"

async function main(): Promise<void> {

  const pokeApi = new PokeApiService()
  const box = new BoxService()
  const pokemonsSalvos = await box.carregar()
  const catalogo = new CatalogoPokemon(pokemonsSalvos)
  const controller = new TerminalController(pokeApi, box, catalogo)

    if (process.argv[2] === "menu") {
    await controller.executarMenu()
  } else {
    await controller.executarDemonstracao()
  }
}

main().catch((erro) => {
  console.log("Falha:", erro)
  process.exitCode = 1
})