import { Chess } from "./chess";

var board = null;
var game = new Chess();

/*
 * Purpose: Make a random move on the chess board
 * Parameters: None
 * Return: void or possible move
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

/*
 * Purpose: Evaluate the current chess board
 * Parameters: 
 * - board: chessBoard
 * - color: player color ('black' or 'white')
 * Return: total relative values of the chess board
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

/*
 * Purpose: Calculate the best one-move-ahead move
 * Parameters: 
 * - color: player color ('black' or 'white')
 * Return: the best one-move-ahead move
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

function onDragPiece(source, piece, position, orientation) {
    // if the game is over, do not pick up the chess pieces
    if (game.game_over())
        return false;

    // only pick up pieces for White
    else if (piece.search(/^b/) !== -1)
        return false;
}

function onDropPiece(source, target) {
    // check if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Default promote pawn to queen
    })

    if (move === null)
        return 'snapback';

    // make a random move for black
    window.setTimeout(makeRandomMove, 300);
}

// update the board position after the piece snap
function onSnapPiece() {
    board.position(game.fen());
}

var gameConfig = {
    draggable: true,
    position: 'start',
    onDragPiece: onDragPiece,
    onDropPiece: onDropPiece,
    onSnapPiece: onSnapPiece
}

board = Chessboard('myChessBoard', gameConfig);