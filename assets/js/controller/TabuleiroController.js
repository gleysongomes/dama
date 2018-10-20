define([ "require", "jquery", "model/Tabuleiro", "service/TabuleiroService"], function(require, $) {

	var Tabuleiro = require("model/Tabuleiro");
	var TabuleiroService = require("service/TabuleiroService");

	var TabuleiroController = function() {
		this.tabuleiro = new Tabuleiro();
	}

	TabuleiroController.criarTabuleiro = function() {
		var canvas = $("#jogoDama");
		canvas.attr({
			width : Constants.LARGURA_TABULEIRO,
			height : Constants.ALTURA_TABULEIRO
		});
		canvas.css({
			"background-color" : Constants.COR_BACKGROUND_TABULEIRO
		});
		var ctx = canvas[0].getContext("2d");
		this.tabuleiro = TabuleiroService.criarTabuleiro(canvas, ctx);
	}

	return TabuleiroController;
});
