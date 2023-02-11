import { useEffect, useState } from 'react'
import './App.css'

const TURNS = {
  X: '❌',
  O: '◯'
}

const WINCONDITIONS = [

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]

]

const Square = ({ isSelected, children, updateBoard, index }) => {
  const className = isSelected === true ? 'square is-selected' : 'square'

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className} key={index}>
      <span className='cell_content' key={`cell_${index}`}>{children}</span>
    </div>
  )
}

function App () {
  const [board, setBoard] = useState(() => {
    if (window.localStorage.getItem('board')) return JSON.parse(window.localStorage.getItem('board'))
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [draw, setDraw] = useState(false)

  useEffect(() => {
    if (draw === true) {
      restartGame()
    }
  }, [draw])

  useEffect(() => {
    if (window.localStorage.getItem('playerTurn')) setTurn(window.localStorage.getItem('playerTurn'))
  }, [])

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setDraw(false)
    window.localStorage.clear()
  }

  const checkWinner = (checkBoard) => {
    for (const condition of WINCONDITIONS) {
      const [a, b, c] = condition
      if (checkBoard[a] && checkBoard[a] === checkBoard[b] && checkBoard[a] === checkBoard[c]) {
        console.log('WINNER')
        console.log(condition)
        return checkBoard[a]
      }
    }

    return null
  }

  const isEveryElementFilled = array => array.every(el => el)

  const updateBoard = (data) => {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    const newBoard = [...board]

    if (newBoard[data] === null && winner === null) {
      setTurn(newTurn)
      newBoard[data] = turn

      /*
        Aqui vamos a guardar los datos del local storage (turno , tablero)

        */
      window.localStorage.setItem('playerTurn', newTurn)
      window.localStorage.setItem('board', JSON.stringify(newBoard))

      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        setWinner(newWinner)
      }
    }

    const draw2 = isEveryElementFilled(newBoard)

    if (draw2 === true) {
      setDraw(true)
    }

    setBoard(newBoard)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {winner ? 'Gano : ' : 'Empate'}
            </h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={restartGame}>Volver a jugar
              </button>
            </footer>
          </div>
        </section>
      )}

    </main>
  )
}

export default App
