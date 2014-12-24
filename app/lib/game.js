'use strict';

var Game = {
    elements: ['rock', 'paper', 'scissors'],
    getResult: function(p1, p2) {
        var posible = [['...it\'s DRAW', 'draw'], ['Congratulations YOU WIN!', 'win'], ['Ha, ha YOU LOSE :p', 'lost']],
            values = { 'rock' : 1, 'paper': 2, 'scissors': 3 },
            result = (3 + values[p1] - values[p2]) % 3;

        return posible[result];
    }
};

module.exports = Game;
