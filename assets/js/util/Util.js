define(function(require) {

	var Constants = require("util/Constants");

	var Util = function() {
	}

	Util.pecaNaoSobrepostaOutra = function(pecas, peca, mouse) {
		for (i = 0; i < pecas.length; i++) {
			if (pecas[i] != peca) {
				if (Math.sqrt(((mouse.coordenadaX - pecas[i].coordenadaX) * (mouse.coordenadaX - pecas[i].coordenadaX)) + ((mouse.coordenadaY - pecas[i].coordenadaY) * (mouse.coordenadaY - pecas[i].coordenadaY))) < 2 * Constants.RAIO_PADRAO) {
					return false;
				}
			}
		}
		return true;
	}

	Util.mouseSobrepostoPeca = function(pecas, mouse) {
		for (i = 0; i < pecas.length; i++) {
			if (Math.sqrt(((mouse.coordenadaX - pecas[i].coordenadaX) * (mouse.coordenadaX - pecas[i].coordenadaX)) + ((mouse.coordenadaY - pecas[i].coordenadaY) * (mouse.coordenadaY - pecas[i].coordenadaY))) < Constants.RAIO_PADRAO) {
				return true;
			}
		}
		return false;
	}

	Util.pecaSobrepostaCasa = function(casas, peca) {
		for (i = 0; i < casas.length; i++) {
			var centroCasa = {
				coordenadaX : casas[i].coordenadaX + Constants.LARGURA_PADRAO / 2,
				coordenadaY : casas[i].coordenadaY + Constants.ALTURA_PADRAO / 2
			};
			if (Math.sqrt(((peca.coordenadaX - centroCasa.coordenadaX) * (peca.coordenadaX - centroCasa.coordenadaX)) + ((peca.coordenadaY - centroCasa.coordenadaY) * (peca.coordenadaY - centroCasa.coordenadaY))) < Constants.RAIO_PADRAO) {
				casas[i].peca = peca;
				return true;
			}
		}
		return false;
	}

	return Util;
});
