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
            case 1:
                move = getRandomMove();
                break;
            case 2:
                move = calculate1MoveAhead(game.turn());
                break;
            default:
                move = calculateNextMovesMinimax(calAhead, game, game.turn())[1];
                break;
        }
        game.move(move);
        board.position(game.fen());
    }
}

// Computer vs Computer
var playGame = function (algo = 4, skillW = 2, skillB = 2) {
    if (game.game_over() === true) {
        console.log('game over');
        return;
    }
    var skill = game.turn() === 'w' ? skillW : skillB;
    makeMove(algo, skill);
    window.setTimeout(function () {
        playGame(algo, skillW, skillB);
    }, 250);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function (source, target) {
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // If illegal move, snapback
    if (move === null) return 'snapback';

    // Log the move
    console.log(move)

    // make move for black
    window.setTimeout(function () {
        makeMove(4, 3);
    }, 250);
};
