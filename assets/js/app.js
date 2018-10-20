define(function(require) {
	var JogadorController = require("controller/JogadorController");
	var TabuleiroController = require("controller/TabuleiroController");
	var App = function(){
	}
	App.build = function(){
		var tabuleiroController = new TabuleiroController();
		tabuleiroController.criarTabuleiro();
		var jogadorController = new JogadorController(tabuleiro);
		jogadorController.initialize();
	}
	return App;
});
