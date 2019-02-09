define(function (require) {
	var TabuleiroController = require("controller/TabuleiroController");
	var ObservadorController = require("controller/ObservadorController");
	var App = function () {}
	App.build = function () {
		var tabuleiroController = new TabuleiroController();
		var tabuleiro = tabuleiroController.criarTabuleiro();
		var observadorController = new ObservadorController(tabuleiro);
		observadorController.initialize();
	}
	return App;
});