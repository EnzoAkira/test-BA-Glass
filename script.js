/*
Conway's Game of Life
Create a 2nd matrix based on:
1st Matrix:  									| 2nd Matrix: (spoiler)
> D D D D D  									| > D D A D D
> D A A A D  									| > D D A D D
> D D D D D  									| > D D A D D

Rules:
- Live cells stay alive if:
	- they have exactly 2 or 3 alive neighbors in the previous generation.
  - Otherwise they die of loneliness (<2) or overcrowding (>3)
- Dead cells stay dead:
	- Unless they have exactly 3 alive neighbors in the previous generation.

Research:
- Depois de uma pesquisa já tinha visto no YT sobre este "jogo" e sobre o Sr. John Conway
- Pesquisei sobre o "jogo" e verifiquei mais info na Wikipedia (https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

*/

// 1ª Geração
const genX = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
]

// Criar cópia da geração anterior, com isto temos sempre o estado anterior da matrix
let genP = genX.map((arr) => [...arr])

function nextGen() {
  // Inicializar nova matriz
  let genY = []

  // Iterar cell por linhas
  for (let row = 0; row < genP.length; row++) {
    // Inicializar nova linha
    let newRow = []

    // Iterar cell por colunas
    for (let col = 0; col < genP[row].length; col++) {
      // Valor da cell
      let cell = genP[row][col]
      let countNeighbors = checkNeighbors(row, col)

      // Aplicação das regras de sobrevivência
      /*
      - Live cells stay alive if:
      	- they have exactly 2 or 3 alive neighbors in the previous generation.
  			- Otherwise they die of loneliness (<2) or overcrowding (>3)
			- Dead cells stay dead:
				- Unless they have exactly 3 alive neighbors in the previous generation.
      */

      if (cell === 1 && countNeighbors < 2) {
        // Cell morre (loneliness)
        cell = 0
      } else if (cell === 1 && countNeighbors > 3) {
        // Cell morre (overcrowding)
        cell = 0
      } else if (cell === 0 && countNeighbors === 3) {
        // Cell revive
        cell = 1
      }
      // A cell com exatamente 2 ou 3 vizinhos vivos permanece viva
      newRow.push(cell)
    }
    genY.push(newRow)
  }
  console.table(genY)
}

function checkNeighbors(row, col) {
  // Número inicial de vizinhos
  let numNeighbors = 0

  // Verificar vizinhos da cell na linha acima e abaixo
  for (let i = -1; i < 2; i++) {
    // Verifica coluna válida
    if (col + i >= 0 && col + i < genP[row].length - 1) {
      if (row > 0 && genP[row - 1][col + i] == 1) {
        numNeighbors++
      }

      if (row < genP.length - 1 && genP[row + 1][col + i] == 1) {
        numNeighbors++
      }
    }
	}

  // Verifica posição à esquerda
  if (col - 1 >= 0 && genP[row][col - 1] == 1) {
    numNeighbors++
	}

  // Verifica posição à direita
  if (col + 1 < genP[row].length - 1 && genP[row][col + 1] == 1) {
    numNeighbors++
  }
  return numNeighbors
}

nextGen()
