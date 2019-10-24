/**
 * Purpose: Make a random move on the chess board
 * @returns {void/string} possible moves or void
 */
var getRandomMove = function () {
    // if there is no more possible moves, the game is over
    var possibleMoves = game.moves();
    if (possibleMoves.length == 0)
        return;
    else {
        // get the random move
        var randomMove = Math.floor(Math.random() * possibleMoves.length);
        return (possibleMoves[randomMove]);
    }
}

/**
 * Purpose: Evaluate the current chess board
 * @param {*} board chess board
 * @param {*} color player color ('black' or 'white')
 * @returns {int} total relative values of the chess board
 */
var evaluateChessBoard = function (board, color) {
    // assign each chess piece relative value based on https://en.wikipedia.org/wiki/Chess_piece_relative_value
    var chessPieceRV = {
        'pawn': 1,
        'knight': 3,
        'bishop': 3,
        'rook': 5,
        'queen': 9,
        'king': 100 // I value King as 100 since it is the most important piece
    };

    // calculate the total value on the chess board
    var totalRV = 0;
    board.forEach(function (row) {
        row.forEach(function (piece) {
            if (piece !== null) {
                piece['color'] === color ? 1 : -1;
                // add the piece relative value if it is our piece, subtract it if otherwise
                totalRV += pieceValue[piece['type']] * piece['color'];
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
    var currBest1MoveAheadRV = -100;
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
 * Purpose: Calculate the next move using Minimax algorithm 
 * @param {*} counter iteration counter
 * @param {*} game chess game
 * @param {*} color player color ('black' or 'white')
 * @param {*} isMaximizingPlayerValue if true, maximizing player' minimum value; else, minimizing opponent's maximum value
 * @returns {*}
 */
var calculateNextMovesMinimax = function (counter, game, color, isMaximizingPlayerValue = true) {
    if (counter === 0) {
        value = evaluateChessBoard(game.board(), color);
        return [value, null];
    }
    else {
        var bestMoveMinimax = null;
        var bestMoveValue = isMaximizingPlayerValue ? -100 : 100;
        var possibleMoves = game.moves();
        // calculate every possible moves
        for (var i = 0; i < possibleMoves.length; i++) {
            var move = possibleMoves[i];
            game.move(move);
            value = calculateNextMovesMinimax(counter--, game, color, !isMaximizingPlayerValue)[0];
            if (isMaximizingPlayerValue) {
                if (value > bestMoveValue) {
                    bestMoveMinimax = move;
                    bestMoveValue = value;
                }
            }
            else {
                if (value < bestMoveValue) {
                    bestMoveMinimax = move;
                    bestMoveValue = value;
                }
            }
            game.undo();
        }
        return [bestMoveValue, bestMove || possibleMoves[0]];
    }
}