var Player = require('app').Player;
var Router = require('app').Router;
var View = require('app').View;
var Game = require('app').Game;
var app = require('app').App;
var config = { timeout: 500 };

var player1 = new Player('YOU');
var player2 = new Player('COMPUTER');
var router = new Router(document, window);
var view = new View(document);

document.addEventListener('DOMContentLoaded', function() {
    app([player1, player2], Game, router, view, config);
    router.goToState('menu');
    view.registerUIEventes(Game, player1, router);
});