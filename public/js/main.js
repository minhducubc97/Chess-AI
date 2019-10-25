/**
 * Based on https://chessboardjs.com/examples#5001
 */
var board = null;
var game = new Chess();

/**
 * Purpose: move chess piece using the specified algorithm
 * @param {*} algorithm the specified algorithm
 * @param {*} calAhead number of move calculated ahead
 * @returns {void}
 */
var movePiece = function (algorithm, calAhead = 3) {
    if (game.game_over()) {
        return;
    }
    else {
        var move = null;
        switch (algorithm) {
            // very easy mode - calculate only 1 step ahead
            case 1:
                move = calculate1MoveAhead(game.turn());
                console.log(move);
                break;
            // medium mode
            case 2:
            default:
                move = calculateNextMovesMinimax(calAhead, game, game.turn());
                console.log(move);
                break;
        }
        game.move(move);
        board.position(game.fen());
    }
}

/**
 * Purpose: only allow dragging player's pieces when it's not yet game over
 * @param {*} source not used
 * @param {*} piece piece dragged
 * @param {*} position not used
 * @param {*} orientation not used
 */
var onDragStart = function (source, piece, position, orientation) {
    if (game.game_over() || piece.search(/^b/) !== -1)
        return false;
}

/**
 * Purpose: check if the move is legal
 * @param {*} source starting position of the piece
 * @param {*} target destination of the move
 */
var onDrop = function (source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Default promote pawn to queen
    })

    if (move === null)
        return 'snapback';

    window.setTimeout(function () {
        movePiece(2, 3);
    }, 300);
}

/**
 * Purpose: remove snapped piece
 */
var onSnapEnd = function () {
    board.position(game.fen());
}

/**
 * Purpose: check if the game is over
 * @param {*} oldPos not used
 * @param {*} newPos not used
 */
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