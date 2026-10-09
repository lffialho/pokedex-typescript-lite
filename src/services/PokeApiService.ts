import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon"
import { normalizarBusca } from "../utils/textFormatters"

const URL_BASE = "https://pokeapi.co/api/v2/pokemon"

export class PokeApiService {
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo> {
    const termo = normalizarBusca(nomeOuId)
    const resposta = await fetch(`${URL_BASE}/${encodeURIComponent(termo)}`)
    const dados = (await resposta.json()) as PokemonApiResponse

    return this.mapearParaResumo(dados)
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