define(["require", "jquery", "model/TabuleiroModel", "service/TabuleiroService", "util/Constants"], function (require, $) {

	var Constants = require("util/Constants");
	var Tabuleiro = require("model/TabuleiroModel");
	var TabuleiroService = require("service/TabuleiroService");

	var TabuleiroController = function () {}

	TabuleiroController.prototype.criarTabuleiro = function () {
		var canvas = $("#jogoDama");
		canvas.attr({
			width: Constants.LARGURA_TABULEIRO,
			height: Constants.ALTURA_TABULEIRO
		});
		canvas.css({
			"background-color": Constants.COR_BACKGROUND_TABULEIRO
		});
		var ctx = canvas[0].getContext("2d");
		return TabuleiroService.criarTabuleiro(canvas, ctx);
	}

	return TabuleiroController;
});