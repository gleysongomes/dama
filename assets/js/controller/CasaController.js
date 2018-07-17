define(function(require) {

	var CasaService = require("service/CasaService");
	var Constants = require("util/Constants");

	var CasaController = function() {
	}

	CasaController.adicionarCasasTabuleiro = function(ctx) {
		var casas = CasaService.criarCasas(8, 350, 50, Constants.NUMERO_CASAS);
		for (i = 0; i < casas.length; i++) {
			CasaController.adicionarCasaTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaController.adicionarCasasReceberPecasPretas = function(ctx) {
		var casas = CasaService.criarCasas(3, 50, 50, 12);
		for (i = 0; i < casas.length; i++) {
			CasaController.adicionarCasaSemCorTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaController.adicionarCasasReceberPecasAzuis = function(ctx) {
		var casas = CasaService.criarCasas(3, 1050, 50, 12);
		for (i = 0; i < casas.length; i++) {
			CasaController.adicionarCasaSemCorTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaController.adicionarCasaTabuleiro = function(ctx, casa) {
		ctx.beginPath();
		ctx.fillStyle = casa.cor;
		ctx.fillRect(casa.coordenadaX, casa.coordenadaY, casa.largura, casa.altura);
		ctx.closePath();

	}

	CasaController.adicionarCasaSemCorTabuleiro = function(ctx, casa) {
		ctx.beginPath();
		ctx.rect(casa.coordenadaX, casa.coordenadaY, casa.largura, casa.altura);
		ctx.stroke();
		ctx.closePath();

	}

	return CasaController;
});
