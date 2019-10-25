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