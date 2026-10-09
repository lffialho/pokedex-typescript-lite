import { TerminalController } from "./controllers/TerminalController"
import { CatalogoPokemon } from "./models/CatalogoPokemon"
import { BoxService } from "./services/BoxService"
import { PokeApiService } from "./services/PokeApiService"

async function main(): Promise<void> {
  // Cria os serviços e entrega ao controller (injeção de dependências).
  const pokeApi = new PokeApiService()
  const box = new BoxService()
  const pokemonsSalvos = await box.carregar()
  const catalogo = new CatalogoPokemon(pokemonsSalvos)
  const controller = new TerminalController(pokeApi, box, catalogo)

  await controller.executarDemonstracao()
}

main().catch((erro) => {
  console.log("[ERRO] Falha inesperada:", erro)
  process.exitCode = 1
})