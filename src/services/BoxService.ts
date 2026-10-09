import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { PokemonResumo } from "../models/Pokemon"

export class BoxService {
  private caminhoArquivo: string

  constructor(
    caminhoArquivo: string = join(__dirname, "..", "..", "pc_box.json"),
  ) {
    this.caminhoArquivo = caminhoArquivo
  }

  async carregar(): Promise<PokemonResumo[]> {
    try {
      const texto = await readFile(this.caminhoArquivo, "utf-8")
      return JSON.parse(texto) as PokemonResumo[]
    } catch (erro) {
      await this.salvar([])
      return []
    }
  }

  async salvar(pokemons: PokemonResumo[]): Promise<void> {
    const texto = JSON.stringify(pokemons, null, 2)
    await writeFile(this.caminhoArquivo, texto, "utf-8")
  }
}