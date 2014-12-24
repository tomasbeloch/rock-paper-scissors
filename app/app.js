'use strict';

var app = function(players, game, router, view, config) {
    var player1 = players[0];
    var player2 = players[1];

    router.state('menu', function() {
        view.render('menu_screen');
    });

    router.state('selection', function() {
        player2.makeRandomSelection(game.elements);
        view.render('selection_screen');
    });

    router.state('show', function() {
        var gameResult = game.getResult(player1.getSelection(), player2.getSelection()),
            status = gameResult[1],
            message = gameResult[0];
        view.render('show_screen', {
            'player1_selection': player1.getSelection(),
            'player2_selection': player2.getSelection()
        });
        view.renderImg({
            'player1_img': player1.getSelection(),
            'player2_img': player2.getSelection()
        });

        view.checkProgressBar();
        setTimeout(function() {
            view.renderProgressBar(status, message);
        }, config.timeout);
    });
};

module.exports = app;
