import { ApiError } from "../models/CustomErrors"
import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon"
import { normalizarBusca } from "../utils/textFormatters"

const URL_BASE = "https://pokeapi.co/api/v2/pokemon"

export class PokeApiService {
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    const termo = normalizarBusca(nomeOuId)

    if (termo === "") {
      console.log("Informe o nome ou o ID do Pokémon.")
      return null
    }

    try {
      const resposta = await fetch(`${URL_BASE}/${encodeURIComponent(termo)}`)

      if (!resposta.ok) {
        const mensagem =
          resposta.status === 404
            ? `Pokémon não encontrado: ${termo}`
            : `A PokeAPI respondeu com o status ${resposta.status}.`
        throw new ApiError(mensagem, resposta.status)
      }

      const dados = (await resposta.json()) as PokemonApiResponse
      return this.mapearParaResumo(dados)
    } catch (erro) {
      if (erro instanceof ApiError) {
        console.log(`[ERRO] ${erro.message}`)
      } else {
        console.log("Não foi possível buscar o Pokémon.")
      }
      return null
    }
  }

  private mapearParaResumo(dados: PokemonApiResponse): PokemonResumo {
    const tipos = dados.types.map((item) => item.type.name)

    const lerStat = (nome: string): number => {
      const stat = dados.stats.find((item) => item.stat.name === nome)
      return stat !== undefined ? stat.base_stat : 0
    }

    return {
      id: dados.id,
      nome: dados.name,
      tipos: tipos,
      altura: dados.height,
      peso: dados.weight,
      hp: lerStat("hp"),
      ataque: lerStat("attack"),
      defesa: lerStat("defense"),
    }
  }
}