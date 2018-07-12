define([ "require", "jquery", "service/TabuleiroService", "controller/CasaController", "controller/PecaController", "util/Constants", "util/Util" ], function(require, $) {

	var casas = [];
	var pecas = [];
	var pecaSelecionada = false;
	var pecaPressionada = false;
	var coordenadaXAnteriorMouse = 0;
	var coordenadaYAnteriorMouse = 0;

	var TabuleiroService = require("service/TabuleiroService");
	var CasaController = require("controller/CasaController");
	var PecaController = require("controller/PecaController");
	var Constants = require("util/Constants");
	var Util = require("util/Util");

	var TabuleiroController = function() {
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

		casas = CasaController.adicionarCasasTabuleiro(ctx);
		pecas = PecaController.adicionarPecasTabuleiro(ctx, casas);
		TabuleiroController.movimentarPecaTabuleiro(canvas[0], ctx);
	}

	TabuleiroController.reconstruirTabuleiro = function(ctx) {
		ctx.clearRect(0, 0, Constants.LARGURA_TABULEIRO, Constants.ALTURA_TABULEIRO);
		ctx.beginPath();
		ctx.fillStyle = Constants.COR_BACKGROUND_TABULEIRO;
		ctx.fillRect(0, 0, Constants.LARGURA_TABULEIRO, Constants.ALTURA_TABULEIRO);
		ctx.closePath();

		CasaController.adicionarCasasTabuleiro(ctx);
		PecaController.reposicionarPecasTabuleiro(ctx, pecas);
	}

	TabuleiroController.movimentarPecaTabuleiro = function(canvas, ctx) {
		var bcr = canvas.getBoundingClientRect();

		canvas.onmousedown = function(e) {
			e.preventDefault();
			e.stopPropagation();

			coordenadaXAnteriorMouse = parseInt(e.clientX - bcr.left);
			coordenadaYAnteriorMouse = parseInt(e.clientY - bcr.top);

			pecaSelecionada = null;
			pecaPressionada = false;

			for (i = 0; i < pecas.length; i++) {
				var peca = pecas[i];
				if (Math.sqrt(((peca.coordenadaX - coordenadaXAnteriorMouse) * (peca.coordenadaX - coordenadaXAnteriorMouse)) + ((peca.coordenadaY - coordenadaYAnteriorMouse) * (peca.coordenadaY - coordenadaYAnteriorMouse))) < Constants.RAIO_PADRAO) {
					peca.pressionada = true;
					pecaPressionada = true;
					pecaSelecionada = peca;
				}
			}
		}

		canvas.onmousemove = function(e) {

			e.preventDefault();
			e.stopPropagation();

			var coordenadaXAtualMouse = parseInt(e.clientX - bcr.left);
			var coordenadaYAtualMouse = parseInt(e.clientY - bcr.top);

			if (Util.mouseSobrepostoPeca(pecas, {
				coordenadaX : coordenadaXAtualMouse,
				coordenadaY : coordenadaYAtualMouse
			})) {
				canvas.style.cursor = 'pointer';
			} else {
				canvas.style.cursor = 'default';
			}

			if (pecaPressionada) {

				if (Util.pecaSobrepostaCasa(casas, pecaSelecionada)) {
				}

				if (Util.pecaNaoSobrepostaOutra(pecas, pecaSelecionada, {
					coordenadaX : coordenadaXAtualMouse,
					coordenadaY : coordenadaYAtualMouse
				})) {
					var novaCoordenadaXPeca = coordenadaXAtualMouse - coordenadaXAnteriorMouse;
					var novaCoordenadaYPeca = coordenadaYAtualMouse - coordenadaYAnteriorMouse;

					coordenadaXAnteriorMouse = coordenadaXAtualMouse;
					coordenadaYAnteriorMouse = coordenadaYAtualMouse;

					for (i = 0; i < pecas.length; i++) {
						var peca = pecas[i];
						if (peca.pressionada) {
							peca.coordenadaX += novaCoordenadaXPeca;
							peca.coordenadaY += novaCoordenadaYPeca;
						}
					}
					TabuleiroController.reconstruirTabuleiro(ctx);
				}
			}
		}

		canvas.onmouseup = function(e) {
			e.preventDefault();
			e.stopPropagation();
			for (var i = 0; i < pecas.length; i++) {
				pecas[i].pressionada = false;
			}
			pecaPressionada = false;
		}
	}

	return TabuleiroController;

});
