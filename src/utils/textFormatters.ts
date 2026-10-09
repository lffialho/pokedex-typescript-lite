import { PokemonResumo } from "../models/Pokemon"

export const normalizarBusca = (texto: string): string => {
  return texto.trim().toLowerCase()
}

export const formatarPokemon = (pokemon: PokemonResumo): string => {
  const partes = [
    `#${pokemon.id} - ${pokemon.nome}`,
    `Tipos: ${pokemon.tipos.join(", ")}`,
    `Altura: ${pokemon.altura}`,
    `Peso: ${pokemon.peso}`,
    `HP: ${pokemon.hp}`,
    `Ataque: ${pokemon.ataque}`,
    `Defesa: ${pokemon.defesa}`,
  ];

  return partes.join(" | ")
}