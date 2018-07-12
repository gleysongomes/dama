define(function(require) {

	var Casa = require("model/Casa");
	var Constants = require("util/Constants");

	var CasaService = function() {
	}

	CasaService.criarCasas = function(n) {
		var casas = [], coordenadaX = 50, coordenadaY = 50, linha = 0, corSelecionada = "";
		for (i = 0; i < n; i++) {
			if (i > 0 && i % 8 == 0) {
				linha++;
				coordenadaX = 50;
				coordenadaY += 80;
			}
			if (linha % 2 == 0) {
				if (i % 2 == 0) {
					corSelecionada = "#ffffff";
				} else {
					corSelecionada = "green";
				}
			} else {
				if (i % 2 == 0) {
					corSelecionada = "green";
				} else {
					corSelecionada = "#ffffff";
				}
			}
			casas.push(new Casa(i, coordenadaX, coordenadaY, Constants.LARGURA_PADRAO, Constants.ALTURA_PADRAO, corSelecionada));
			coordenadaX += 80;
		}
		return casas;
	}
	return CasaService;
});
