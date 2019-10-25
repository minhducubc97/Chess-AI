/**
 * Purpose: Evaluate the current chess board
 * @param {*} board chess board
 * @param {*} color player color ('black' or 'white')
 * @returns {int} total relative values of the chess board
 */
var evaluateChessBoard = function (board, color) {
    // assign each chess piece relative value based on https://en.wikipedia.org/wiki/Chess_piece_relative_value
    var chessPieceRV = {
        'p': 1, // pawn
        'n': 3, // knight
        'b': 3, // bishop
        'r': 5, // rook
        'q': 9, // queen
        'k': 100 // I value King as 100 since it is the most important piece
    };

    // calculate the total value on the chess board
    var totalRV = 0;
    board.forEach(function (row) {
        row.forEach(function (piece) {
            if (piece !== null) {
                if (piece['color'] === color) {
                    totalRV += chessPieceRV[piece['type']];
                }
                else {
                    totalRV -= chessPieceRV[piece['type']];
                }
            }
        });
    });
    return totalRV;
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
        possibleMoves.sort(function (a, b) {
            return .5 - Math.random()
        });
        // calculate every possible moves
        for (var i = 0; i < possibleMoves.length; i++) {
            var move = possibleMoves[i];
            game.move(move);
            console.log(move);
            value = calculateNextMovesNegamax(counter - 1, game, color, !isMaximizingPlayerValue, alpha, beta)[1];

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
                beta = Maths.min(value, beta);
            }
            game.undo();
            console.log("Alpha: " + alpha + "; Beta: " + beta);

            if (alpha >= beta) {
                console.log("Alpha: " + alpha + "; Beta: " + beta);
                break;
            }
        }
        return [bestMoveNegamax, bestMoveValue];
    }
}