export interface PokemonApiResponse {
  id: number
  name: string
  height: number
  weight: number
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}

export interface PokemonResumo {
  readonly id: number
  nome: string
  tipos: string[]
  altura: number
  peso: number
  hp: number
  ataque: number
  defesa: number
}