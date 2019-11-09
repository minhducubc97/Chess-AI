/**
 * Purpose: Reverse a 2D array
 * @param {*} array 
 */
var reverse2DArray = function (array) {
    array.forEach(function (row) {
        row.reverse();
    });
    array.reverse();
    return array;
};

// evaluate the chessboard based on https://www.chessprogramming.org/Simplified_Evaluation_Function
const pawnWhiteEvaluation = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const pawnBlackEvaluation = reverse2DArray(pawnWhiteEvaluation);

const knightWhiteEvaluation = [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20, 0, 0, 0, 0, -20, -40],
    [-30, 0, 10, 15, 15, 10, 0, -30],
    [-30, 5, 15, 20, 20, 15, 5, -30],
    [-30, 0, 15, 20, 20, 15, 0, -30],
    [-30, 5, 10, 15, 15, 10, 5, -30],
    [-40, -20, 0, 5, 5, 0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50]
];

const knightBlackEvaluation = reverse2DArray(knightWhiteEvaluation);

const bishopWhiteEvaluation = [
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 10, 10, 5, 0, -10],
    [-10, 5, 5, 10, 10, 5, 5, -10],
    [-10, 0, 10, 10, 10, 10, 0, -10],
    [-10, 10, 10, 10, 10, 10, 10, -10],
    [-10, 5, 0, 0, 0, 0, 5, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20]
];

const bishopBlackEvaluation = reverse2DArray(bishopWhiteEvaluation);

const rooksWhiteEvaluation = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [5, 10, 10, 10, 10, 10, 10, 5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [0, 0, 0, 5, 5, 0, 0, 0]
];

const rooksBlackEvaluation = reverse2DArray(rooksWhiteEvaluation);

const queenWhiteEvaluation = [
    [-20, -10, -10, -5, -5, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 5, 5, 5, 0, -10],
    [-5, 0, 5, 5, 5, 5, 0, -5],
    [0, 0, 5, 5, 5, 5, 0, -5],
    [-10, 5, 5, 5, 5, 5, 0, -10],
    [-10, 0, 5, 0, 0, 0, 0, -10],
    [-20, -10, -10, -5, -5, -10, -10, -20]
];

const queenBlackEvaluation = reverse2DArray(queenWhiteEvaluation);

const kingWhiteEvaluation = [
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-20, -30, -30, -40, -40, -30, -30, -20],
    [-10, -20, -20, -20, -20, -20, -20, -10],
    [20, 20, 0, 0, 0, 0, 20, 20],
    [20, 30, 10, 0, 0, 10, 30, 20]
];

const kingBlackEvaluation = reverse2DArray(kingWhiteEvaluation);

const kingWhiteEndGameEvaluation = [
    [-50, -40, -30, -20, -20, -30, -40, -50],
    [-30, -20, -10, 0, 0, -10, -20, -30],
    [-30, -10, 20, 30, 30, 20, -10, -30],
    [-30, -10, 30, 40, 40, 30, -10, -30],
    [-30, -10, 30, 40, 40, 30, -10, -30],
    [-30, -10, 20, 30, 30, 20, -10, -30],
    [-30, -30, 0, 0, 0, 0, -30, -30],
    [-50, -30, -30, -30, -30, -30, -30, -50]
];

const kingBlackEndGameEvaluation = reverse2DArray(kingWhiteEndGameEvaluation);

// assign each chess piece relative value based on https://www.chessprogramming.org/Simplified_Evaluation_Function
const chessPieceRV = {
    'p': 100, // pawn
    'n': 320, // knight
    'b': 330, // bishop
    'r': 500, // rooks
    'q': 900, // queen
    'k': 20000 // king
};

/**
 * Purpose: Evaluate the current chess board
 * @param {*} board chess board
 * @param {*} color player color ('black' or 'white')
 * @returns {int} total relative values of the chess board
 */
var evaluateChessBoard = function (board, color) {
    // calculate the total value on the chess board
    var totalRV = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j] !== null) {
                if (board[i][j]['color'] === color) {
                    totalRV += getPieceRV(board[i][j], i, j, color);
                }
                else {
                    totalRV -= getPieceRV(board[i][j], i, j, color);
                }
            }
        }
    }
    return totalRV;
}

var getPieceRV = function (piece, xcoord, ycoord, color) {
    switch (piece.type) {
        case 'p':
            return chessPieceRV[piece.type] + (color === 'b' ? pawnBlackEvaluation[ycoord][xcoord] : pawnWhiteEvaluation[ycoord][xcoord]);
        case 'n':
            return chessPieceRV[piece.type] + (color === 'b' ? knightBlackEvaluation[ycoord][xcoord] : knightWhiteEvaluation[ycoord][xcoord]);
        case 'b':
            return chessPieceRV[piece.type] + (color === 'b' ? bishopBlackEvaluation[ycoord][xcoord] : bishopWhiteEvaluation[ycoord][xcoord]);
        case 'r':
            return chessPieceRV[piece.type] + (color === 'b' ? rooksBlackEvaluation[ycoord][xcoord] : rooksWhiteEvaluation[ycoord][xcoord]);
        case 'q':
            return chessPieceRV[piece.type] + (color === 'b' ? queenBlackEvaluation[ycoord][xcoord] : queenWhiteEvaluation[ycoord][xcoord]);
        case 'k':
            return chessPieceRV[piece.type] + (color === 'b' ? kingBlackEvaluation[ycoord][xcoord] : kingWhiteEvaluation[ycoord][xcoord]);
        default:
            console.log("Unknown chess piece");
            return;
    }
}

/**
 * Purpose: Calculate the best one-move-ahead move
 * @param {*} color 
 * @returns {string} the best one-move-ahead move
 */
var calculate1MoveAhead = function (color) {
    // if there is no more possible moves, the game is over
    var possibleMoves = game.moves();
    if (possibleMoves.length == 0)
        return;

    // randomize all the possible moves to prevent all moves leading to equal outcome, because calculating 1 move ahead is very limited
    possibleMoves.sort(function (a, b) {
        return .5 - Math.random()
    });

    // try out every possible move to find the move with the highest relative value
    var currBest1MoveAhead = null;
    var currBest1MoveAheadRV = Number.NEGATIVE_INFINITY;
    possibleMoves.forEach(function (move) {
        game.move(move);
        var moveRV = evaluateChessBoard(game.board(), color);
        if (moveRV > currBest1MoveAheadRV) {
            currBest1MoveAheadRV = moveRV;
            currBest1MoveAhead = move;
        }
        game.undo();
    });

    return currBest1MoveAhead;
}

/**
 * Purpose: Find the next move using Negamax algorithm (based on MiniMax)
 * @param {*} counter iteration counter
 * @param {*} game chess game
 * @param {*} color player color ('black' or 'white')
 * @returns {*}
 */
var calculateNextMovesNegamax = function (counter, game, color) {
    return (calculateNextMovesValueNegamax(counter, game, color)[0] || game.moves()[0]);
}

/**
 * Purpose: Calculate the next move value using Negamax algorithm, with the inclusion of Alpha-beta pruning
 * @param {*} counter iteration counter
 * @param {*} game chess game
 * @param {*} color player color ('black' or 'white')
 * @param {*} isMaximizingPlayerValue if true, maximizing player' minimum value; else, minimizing opponent's maximum value
 * @returns {*}
 */
var calculateNextMovesValueNegamax = function (counter, game, color, isMaximizingPlayerValue = true, alpha = Number.NEGATIVE_INFINITY, beta = Number.POSITIVE_INFINITY) {
    if (counter === 0) {
        value = evaluateChessBoard(game.board(), color);
        return [null, value];
    }
    else {
        var bestMoveNegamax = null;
        var bestMoveValue = isMaximizingPlayerValue ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        var possibleMoves = game.moves();

        // rank the move according to its best initial position
        for (var i = 0; i < possibleMoves.length; i++) {
            var move = possibleMoves[i];
            game.move(move);
            move.score = evaluateChessBoard(game.board(), color);
            game.undo();
        }

        possibleMoves.sort(compareMoves);
        // calculate every possible moves
        for (var i = 0; i < possibleMoves.length; i++) {
            console.log('Thinking');
            var move = possibleMoves[i];
            game.move(move);
            value = calculateNextMovesValueNegamax(counter - 1, game, color, !isMaximizingPlayerValue, alpha, beta)[1];

            if (isMaximizingPlayerValue) {
                if (value > bestMoveValue) {
                    bestMoveNegamax = move;
                    bestMoveValue = value;
                }
                alpha = Math.max(value, alpha);
            }
            else {
                if (value < bestMoveValue) {
                    bestMoveNegamax = move;
                    bestMoveValue = value;
                }
                beta = Math.min(value, beta);
            }
            game.undo();

            if (alpha >= beta) {
                break;
            }
        }

        console.log(bestMoveNegamax);
        return [bestMoveNegamax, bestMoveValue];
    }
}

/**
 * Purpose: Compare move by its chessboard score
 * @param {*} a move a
 * @param {*} b move bS
 */
var compareMoves = function (a, b) {
    if (a.score < b.score) {
        return -1;
    }
    if (a.score > b.score) {
        return 1;
    }
    return 0;
}