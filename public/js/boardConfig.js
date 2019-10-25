/**
 * Based on https://chessboardjs.com/examples#5001
 */
var board = null;
var game = new Chess();

var onDragStart = function (source, piece, position, orientation) {
    // do not pick up the chess pieces if the game is over or the piece is Black
    if (game.game_over() || piece.search(/^b/) !== -1)
        return false;
}

var onDrop = function (source, target) {
    // check if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Default promote pawn to queen
    })

    if (move === null)
        return 'snapback';

    // make a random move for black
    window.setTimeout(function () {
        movePiece(1, 3);
    }, 300);
}

// update the board position after the piece snap
var onSnapEnd = function () {
    board.position(game.fen());
}

var onMoveEnd = function (oldPos, newPos) {
    if (game.game_over()) {
        alert('The game is over');
    }
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onMoveEnd: onMoveEnd,
}

board = Chessboard('board', config);