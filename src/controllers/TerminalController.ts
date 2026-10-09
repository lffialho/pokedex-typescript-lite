import { createInterface } from "node:readline/promises"
import { CatalogoPokemon } from "../models/CatalogoPokemon"
import { PokemonResumo } from "../models/Pokemon"
import { BoxService } from "../services/BoxService"
import { PokeApiService } from "../services/PokeApiService"
import { formatarPokemon } from "../utils/textFormatters"

export class TerminalController {
  private pokeApi: PokeApiService
  private box: BoxService
  private catalogo: CatalogoPokemon

  constructor(
    pokeApi: PokeApiService,
    box: BoxService,
    catalogo: CatalogoPokemon,
  ) {
    this.pokeApi = pokeApi
    this.box = box
    this.catalogo = catalogo
  }

  async buscar(nomeOuId: string): Promise<PokemonResumo | null> {
    const pokemon = await this.pokeApi.buscarPokemon(nomeOuId)

    if (pokemon !== null) {
      console.log(`Pokémon encontrado: ${pokemon.nome}`)
      console.log(formatarPokemon(pokemon))
    }

    return pokemon
  }

  async buscarEAdicionar(nomeOuId: string): Promise<void> {
    const pokemon = await this.buscar(nomeOuId)

    if (pokemon === null) {
      return
    }

    const adicionado = this.catalogo.adicionar(pokemon)

    if (!adicionado) {
      console.log(`${pokemon.nome} já está no catálogo.`)
      return
    }

    await this.box.salvar(this.catalogo.listar())
    console.log(`${pokemon.nome} adicionado ao catálogo.`)
  }

  listar(): void {
    const pokemons = this.catalogo.listar()

    if (pokemons.length === 0) {
      console.log("Catálogo vazio.")
      return
    }

    console.log("Catálogo atual:")
    pokemons.forEach((pokemon) => {
      console.log(formatarPokemon(pokemon))
    })
  }

  async remover(id: number): Promise<void> {
    const removido = this.catalogo.remover(id)

    if (!removido) {
      console.log("Nenhum Pokémon encontrado com esse ID.")
      return
    }

    await this.box.salvar(this.catalogo.listar())
    console.log("Pokémon removido do catálogo.")
  }

  private async esvaziarCaixa(): Promise<void> {
    this.catalogo.limpar()
    await this.box.salvar(this.catalogo.listar())
    console.log("Caixa esvaziada: pc_box.json = []")
  }

  async executarDemonstracao(): Promise<void> {
    console.log("### Pokédex TypeScript Lite ###")
    await this.esvaziarCaixa()

    console.log("1. Buscar e adicionar: pikachu")
    await this.buscarEAdicionar("pikachu")

    console.log("2. Buscar e adicionar: charmander")
    await this.buscarEAdicionar("charmander")

    console.log("3. Repetir o pikachu (duplicado)")
    await this.buscarEAdicionar("pikachu")

    console.log("4. Buscar um nome que não existe")
    await this.buscar("pokemon-inexistente")

    console.log("5. Listar o catálogo")
    this.listar()

    console.log("6. Remover o ID 25")
    await this.remover(25);

    console.log("7. Listar de novo")
    this.listar()

    console.log("")
    await this.esvaziarCaixa()
  }

  async executarMenu(): Promise<void> {
    const leitor = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    let continuar = true

    while (continuar) {
      console.log("### Pokédex TypeScript Lite ###")
      console.log("1  Buscar e adicionar Pokémon")
      console.log("2  Listar catálogo")
      console.log("3  Remover Pokémon pelo ID")
      console.log("0  Sair")

      const opcao = (await leitor.question("Escolha uma opção: ")).trim()

      if (opcao === "1") {
        const termo = await leitor.question("Nome ou ID do Pokémon: ")
        await this.buscarEAdicionar(termo)
      } else if (opcao === "2") {
        this.listar()
      } else if (opcao === "3") {
        const texto = await leitor.question("ID do Pokémon: ")
        const id = Number(texto)

        if (Number.isInteger(id)) {
          await this.remover(id)
        } else {
          console.log("ID inválido. Digite um número inteiro")
        }
      } else if (opcao === "0") {
        continuar = false
      } else {
        console.log("Opção inválida.")
      }
    }

    leitor.close()
    console.log("FIM!")
  }
}