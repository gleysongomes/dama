define(function(require) {

	var PecaService = require("service/PecaService");
	var Constants = require("util/Constants");

	var PecaController = function() {
	}

	PecaController.adicionarPecasTabuleiro = function(ctx, casas) {
		var pecas = PecaService.criarPecas(casas);
		for (i = 0; i < pecas.length; i++) {
			PecaController.adicionarPecaTabuleiro(ctx, pecas[i]);
		}
		return pecas;
	}

	PecaController.adicionarPecaTabuleiro = function(ctx, peca) {
		ctx.beginPath();
		ctx.fillStyle = peca.cor;
		ctx.arc(peca.coordenadaX, peca.coordenadaY, peca.raio, peca.anguloInicial, peca.anguloFinal);
		ctx.fill();
		ctx.closePath();
	}

	PecaController.reposicionarPecasTabuleiro = function(ctx, pecas) {
		for (i = 0; i < pecas.length; i++) {
			PecaController.adicionarPecaTabuleiro(ctx, pecas[i]);
		}
	}

	return PecaController;
});
