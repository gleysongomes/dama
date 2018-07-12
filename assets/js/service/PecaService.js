define(function(require) {

	var Peca = require("model/Peca");
	var Constants = require("util/Constants");

	var PecaService = function() {
	}

	PecaService.criarPecas = function(casas) {
		var pecas = [], coordenadaX = 90, coordenadaY = 90, linha = 0, idPeca = 0;
		for (i = 0; i < casas.length; i++) {
			if (i > 0 && i % 8 == 0) {
				linha++;
				coordenadaX = 90;
				coordenadaY += 80;
			}
			if (linha < 3) {
				PecaService.inserirPeca(casas, pecas, linha, i, idPeca, coordenadaX, coordenadaY, "black");
			}
			if (linha > 4) {
				PecaService.inserirPeca(casas, pecas, linha, i, idPeca, coordenadaX, coordenadaY, "#5f9ea0");
			}
			coordenadaX += 80;
		}
		return pecas;
	}

	PecaService.inserirPeca = function(casas, pecas, linha, i, idPeca, coordenadaX, coordenadaY, cor) {
		if (linha % 2 == 0) {
			if (i % 2 == 1) {
				casas[i].peca = new Peca(idPeca, coordenadaX, coordenadaY, Constants.RAIO_PADRAO, cor);
				pecas.push(casas[i].peca);
				idPeca++;
			}
		} else {
			if (i % 2 == 0) {
				casas[i].peca = new Peca(idPeca, coordenadaX, coordenadaY, Constants.RAIO_PADRAO, cor);
				pecas.push(casas[i].peca);
				idPeca++;
			}
		}
	}

	return PecaService;
});
