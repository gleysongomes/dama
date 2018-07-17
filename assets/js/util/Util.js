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

	return Util;
});
