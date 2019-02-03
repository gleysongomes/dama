define(function (require) {
	var TabuleiroController = require("controller/TabuleiroController");
	var ObservadorController = require("controller/ObservadorController");
	var App = function () {}
	App.build = function () {
		var tabuleiroController = new TabuleiroController();
		tabuleiroController.criarTabuleiro();

		//console.log(tabuleiroController.tabuleiro);

		//var observadorController = new ObservadorController(tabuleiroController.tabuleiro);
		//observadorController.initialize();
	}
	return App;
});