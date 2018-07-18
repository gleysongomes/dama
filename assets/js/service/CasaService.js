define(function(require) {

	var Casa = require("model/Casa");
	var Constants = require("util/Constants");

	var CasaService = function() {
	}

	CasaService.criarCasas = function(k, x, y, n) {
		var casas = [], coordenadaX = x, coordenadaY = y, linha = 0, coluna = 0, corSelecionada = "";
		for (var i = 0; i < n; i++) {
			if (i > 0 && i % k == 0) {
				linha++;
				coluna = 0;
				coordenadaX = x;
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
			casas.push(new Casa(i, linha, coluna, coordenadaX, coordenadaY, Constants.LARGURA_PADRAO, Constants.ALTURA_PADRAO, corSelecionada));
			coluna++;
			coordenadaX += 80;
		}
		return casas;
	}
	return CasaService;
});
