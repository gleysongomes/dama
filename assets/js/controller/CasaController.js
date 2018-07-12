define(function(require) {

	var CasaService = require("service/CasaService");
	var Constants = require("util/Constants");

	var CasaController = function() {
	}

	CasaController.adicionarCasasTabuleiro = function(ctx) {
		var casas = CasaService.criarCasas(Constants.NUMERO_CASAS);
		for (i = 0; i < casas.length; i++) {
			CasaController.adicionarCasaTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaController.adicionarCasaTabuleiro = function(ctx, casa) {
		ctx.beginPath();
		ctx.fillStyle = casa.cor;
		ctx.fillRect(casa.coordenadaX, casa.coordenadaY, casa.largura, casa.altura);
		ctx.closePath();

	}

	return CasaController;
});
