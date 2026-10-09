# Pokédex TypeScript Lite

## Sobre o projeto

Programa de terminal em Node.js com TypeScript. Ela consulta a PokeAPI, pega o JSON que a API devolve e transforma em um objeto mais simples (`PokemonResumo`) e também guarda uma lista de Pokémon no arquivo `pc_box.json`.

## Objetivo

Praticar o que aprendi no Módulo 01: Node.js, TypeScript, interfaces, funções com tipos, arrays e objetos, JSON, métodos de array, classes, async/await, fetch, tratamento de erros, GitHub, GitFlow e GitHub Projects.

## Tecnologias utilizadas

- Node.js v24.20.0
- TypeScript 6.0.3
- tsx
- PokeAPI
- Git e GitHub

## O que precisa ter instalado

- Node.js
- npm
- Git

## Como instalar

```bash
git clone https://github.com/lffialho/pokedex-typescript-lite.git
cd pokedex-typescript-lite
npm install
```

## Como rodar

| Comando | O que faz |
| --- | --- |
| `npm run start` | Compila e roda uma demonstração de tudo que o programa faz. Começa e termina com a caixa vazia.
| `npm run menu` | Compila e abre o menu. A lista fica salva em `pc_box.json`.
| `npm run dev` | Roda o TypeScript direto com tsx.
| `npm run build` | Compila a pasta `src` e coloca o resultado em `dist`.

Atenção: o `npm run start` apaga tudo do `pc_box.json` no começo e no fim.

## Funcionalidades

- Busca Pokémon pelo nome ou pelo ID
- Lida com Pokémon que não existe e com falha de internet sem travar o programa
- Transformar a resposta da API em objeto simplificado (id, nome, tipos, altura, peso, HP, ataque e defesa)
- Adiciona à lista e não deixa repetir o mesmo ID
- Mostra a lista
- Remover pelo ID
- Salvar a lista em `pc_box.json`
- Menu

## Exemplos de execução

Saídas reais do `npm run start`

### Busca válida

Entrada: `pikachu`

Saída:

```
### Pokédex TypeScript Lite ###
Caixa esvaziada: pc_box.json = []
1. Buscar e adicionar: pikachu
Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
pikachu adicionado ao catálogo.
```

### Busca inválida

Entrada: `pokemon-inexistente`

Saída:

```
4. Buscar um nome que não existe
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Duplicidade

Entrada: adicionar `pikachu` duas vezes

Saída obtida:

```
3. Repetir o pikachu (duplicado)
Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
pikachu já está no catálogo.
```

### Remover

Entrada: remover o ID 25

Saída:

```
6. Remover o ID 25
Pokémon removido do catálogo.
```

## Estrutura do projeto

```
pokedex-typescript-lite/
├ src/
|   ├ controllers/TerminalController.ts
|   ├ models/CatalogoPokemon.ts
|   ├ models/CustomErrors.ts
|   ├ models/Pokemon.ts
|   ├ services/BoxService.ts
|   ├ services/PokeApiService.ts
|   └─ utils/textFormatters.ts  
|   ├ main.ts
├ package.json
├ pc_box.json
├ README.md
└ tsconfig.json
```

| Arquivo | Pra que serve 
| --- | --- |
| `main.ts` | Cria os objetos, conecta um no outro e abre o menu. 
| `TerminalController.ts` | Mostra as mensagens no terminal e controla os serviços. 
| `PokeApiService.ts` | Consulta a PokeAPI com `fetch` e converte o JSON em `PokemonResumo`. 
| `BoxService.ts` | Lê e salva o arquivo `pc_box.json`. 
| `Pokemon.ts` | Interfaces `PokemonApiResponse` e `PokemonResumo`. 
| `CatalogoPokemon.ts` | Classe com as regras do catálogo: adicionar, listar, remover e bloquear duplicados. 
| `CustomErrors.ts` | Classe `ApiError`. 
| `textFormatters.ts` | Funções de formatação de texto. 

## Conceitos aplicados

- **TypeScript:** interfaces `PokemonApiResponse` e `PokemonResumo`, parâmetros e retornos tipados, `strict: true`, `readonly`, `private`.
- **Fetch e async/await:** `PokeApiService.buscarPokemon` usa `await fetch(...)` e `await resposta.json()` e devolve `Promise<PokemonResumo | null>`.
- **Tratamento de erros:** `try/catch`, verificação de `resposta.ok` (404), `ApiError` e `instanceof`. Se algo der errado, o método devolve `null` e o programa continua.
- **Métodos de array:** `map` (tipos, em `PokeApiService`), `find` (duplicidade e existência, em `CatalogoPokemon`), `filter` (remover, em `CatalogoPokemon`) e `forEach` (mostra a lista, no `TerminalController`).
- **Classe `CatalogoPokemon`:** atributo privado `pokemons`, construtor e os métodos `adicionar`, `listar`, `remover` e `limpar`.
- **Arquitetura em camadas:** `controllers`, `services`, `models` e `utils`, cada uma com uma responsabilidade.

## Organização do GitHub Projects

- backlog
- a fazer
- em andamento
- concluído

## Branches utilizadas

- `main`: versão final.
- `develop`: onde juntei as funções prontas..
- `feat/pokedex`: desenvolvimento do código (busca, lista, salvar, menu).
- `docs/readme`: documentação.

## Vídeo

Link do vídeo: 

## Melhorias futuras

- Filtros por tipo e ordenar a lista
- Mais atributos (velocidade, imagem)
- API própria com Express
