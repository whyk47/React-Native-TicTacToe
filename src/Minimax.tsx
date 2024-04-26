import { X, O, EMPTY, DRAW, lines } from './constants'

const player = (board: string[]): string => {
    let x = 0
    let o = 0
    for (let i = 0; i < board.length; i++) {
        if (board[i] === X) x++
        if (board[i] === O) o++
    }
    if (x === o) return X
    else return O
}

const moves = (board: string[]): number[] => {
    let m = []
    for (let i = 0; i < board.length; i++) {
        if (board[i] === EMPTY) m.push(i)
    }
    return m
}

const markBoard = (board: string[], move: number, p: string): string[] => {
    let new_board = board.slice()
    new_board[move] = p
    return new_board
}

const result = (board: string[], move: number): string[] => {
    return markBoard(board, move, player(board))
}

const winner = (board: string[]): string => {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a]
        }
      }
      if (!board.includes(EMPTY)) {
        return DRAW
    }
    return EMPTY
}

const terminal = (board: string[]): boolean => {
    return winner(board) !== EMPTY
}

const util = (board: string[]): number => {
    return winner(board) === X ? 1 : winner(board) === O ? -1 : 0
}

const min_val = (board: string[], alpha: number, beta: number): number => {
    if (terminal(board)) return util(board)
    let v = Infinity
    let m = moves(board)
    for (let i = 0; i < m.length; i++) {
        v = Math.min(v, max_val(result(board, m[i]), alpha, beta))
        beta = Math.min(beta, v)
        if (beta <= alpha) break
    }
    return v
}

const max_val = (board: string[], alpha: number, beta: number): number => {
    if (terminal(board)) return util(board)
    let v = -Infinity
    let m = moves(board)
    for (let i = 0; i < m.length; i++) {
        v = Math.max(v, min_val(result(board, m[i]), alpha, beta))
        alpha = Math.max(alpha, v)
        if (beta <= alpha) break
    }
    return v
}

export default function Minimax(board: string[], hard: boolean = true): number {
    if (terminal(board)) return -1
    let p = player(board)
    let m = moves(board)
    let opponent = p === X ? O : X
    for (let i = 0; i < m.length; i++) {
        if (terminal(result(board, m[i])) || terminal(markBoard(board, m[i], opponent))) {
            return m[i]
        }
    }
    if (!hard) return m[Math.floor(Math.random() * m.length)]
    let fun = p === X ? max_val : min_val
    let f2 = p === X ? min_val : max_val
    let optimal = fun(board, -Infinity, Infinity)
    let optimalMoves = []
    for (let i = 0; i < m.length; i++) {
        if (f2(result(board, m[i]), -Infinity, Infinity) === optimal) {
            optimalMoves.push(m[i])
        }
    }
    return optimalMoves[Math.floor(Math.random() * optimalMoves.length)]
}