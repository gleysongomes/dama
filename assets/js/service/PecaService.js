define(function(require) {

	var Peca = require("model/Peca");
	var Constants = require("util/Constants");

	var PecaService = function() {
	}

	PecaService.criarPecas = function(casas) {
		var pecas = [], coordenadaX = 390, coordenadaY = 90, linha = 0, idPeca = 0;
		for (i = 0; i < casas.length; i++) {
			if (i > 0 && i % 8 == 0) {
				linha++;
				coordenadaX = 390;
				coordenadaY += 80;
			}
			if (linha < 3) {
				if (PecaService.inserirPeca(casas, pecas, linha, i, idPeca, coordenadaX, coordenadaY, "black")) {
					idPeca++;
				}
			}
			if (linha > 4) {
				if (PecaService.inserirPeca(casas, pecas, linha, i, idPeca, coordenadaX, coordenadaY, "#5f9ea0")) {
					idPeca++;
				}
			}
			coordenadaX += 80;
		}
		return pecas;
	}

	PecaService.inserirPeca = function(casas, pecas, linha, i, idPeca, coordenadaX, coordenadaY, cor) {
		if (linha % 2 == 0) {
			if (i % 2 == 1) {
				casas[i].idPeca = idPeca;
				pecas.push(new Peca(idPeca, coordenadaX, coordenadaY, Constants.RAIO_PADRAO, cor));
				return true;
			}
		} else {
			if (i % 2 == 0) {
				casas[i].idPeca = idPeca;
				pecas.push(new Peca(idPeca, coordenadaX, coordenadaY, Constants.RAIO_PADRAO, cor));
				return true;
			}
		}
		return false;
	}

	PecaService.clicouSobrePeca = function(peca, coordenadaXAnteriorMouse, coordenadaYAnteriorMouse) {
		if (Math.sqrt(((peca.coordenadaX - coordenadaXAnteriorMouse) * (peca.coordenadaX - coordenadaXAnteriorMouse)) + ((peca.coordenadaY - coordenadaYAnteriorMouse) * (peca.coordenadaY - coordenadaYAnteriorMouse))) < Constants.RAIO_PADRAO) {
			return true;
		}
		return false;
	}

	PecaService.atualizarPosicaoPeca = function(pecas, coordenadaXAnteriorMouse, coordenadaYAnteriorMouse, coordenadaXAtualMouse, coordenadaYAtualMouse) {
		var novaCoordenadaXPeca = coordenadaXAtualMouse - coordenadaXAnteriorMouse;
		var novaCoordenadaYPeca = coordenadaYAtualMouse - coordenadaYAnteriorMouse;
		for (var i = 0; i < pecas.length; i++) {
			var peca = pecas[i];
			if (peca.pressionada) {
				peca.coordenadaX += novaCoordenadaXPeca;
				peca.coordenadaY += novaCoordenadaYPeca;
			}
		}
	}

	PecaService.pecaSobrepostaCasa = function(casas, peca) {
		for (var i = 0; i < casas.length; i++) {
			var centroCasa = {
				coordenadaX : casas[i].coordenadaX + Constants.LARGURA_PADRAO / 2,
				coordenadaY : casas[i].coordenadaY + Constants.ALTURA_PADRAO / 2
			};
			if (Math.sqrt(((peca.coordenadaX - centroCasa.coordenadaX) * (peca.coordenadaX - centroCasa.coordenadaX)) + ((peca.coordenadaY - centroCasa.coordenadaY) * (peca.coordenadaY - centroCasa.coordenadaY))) < Constants.RAIO_PADRAO) {
				casas[i].idPeca = peca.id;
				for (j = 0; j < casas.length; j++) {
					if (casas[j].id != casas[i].id && casas[j].idPeca == casas[i].idPeca) {
						casas[j].idPeca = -1;
					}
				}
				return true;
			}
		}
		return false;
	}

	PecaService.pecaConquistada = function(casas, pecas, casasReceberPecasPretas, casasReceberPecasAzuis, casaOrigem, pecaSelecionada) {
		for (var i = 0; i < casas.length; i++) {
			if (casas[i].idPeca == pecaSelecionada.id) {
				if (casas[i].id > casaOrigem.id) {
					if (casaOrigem.id % 8 > casas[i].id % 8) {
						if (casas[i - 7].idPeca != -1 && casas[i - 14].idPeca == -1) {
							if (pecas[casas[i - 7].idPeca].cor == "black") {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasPretas), pecas[casas[i - 7].idPeca]);
							} else {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasAzuis), pecas[casas[i - 7].idPeca]);
							}
							return true;
						}
					} else {
						if (casas[i - 9].idPeca != -1 && casas[i - 18].idPeca == -1) {
							if (pecas[casas[i - 9].idPeca].cor == "black") {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasPretas), pecas[casas[i - 9].idPeca]);
							} else {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasAzuis), pecas[casas[i - 9].idPeca]);
							}
							return true;
						}
					}
				}
				if (casas[i].id < casaOrigem.id) {
					if (casaOrigem.id % 8 > casas[i].id % 8) {
						if (casas[i + 9].idPeca != -1 && casas[i + 18].idPeca == -1) {
							if (pecas[casas[i + 9].idPeca].cor == "black") {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasPretas), pecas[casas[i + 9].idPeca]);
							} else {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasAzuis), pecas[casas[i + 9].idPeca]);
							}
							return true;
						}
					} else {
						if (casas[i + 7].idPeca != -1 && casas[i + 14].idPeca == -1) {
							if (pecas[casas[i + 7].idPeca].cor == "black") {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasPretas), pecas[casas[i + 7].idPeca]);
							} else {
								PecaService.inserirPecaCasa(PecaService.casaLivre(casasReceberPecasAzuis), pecas[casas[i + 7].idPeca]);
							}
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	PecaService.casaLivre = function(casas) {
		for (var i = 0; i < casas.length; i++) {
			if (casas[i].idPeca == -1) {
				return casas[i];
			}
		}
		return null;
	}

	PecaService.inserirPecaCasa = function(casa, peca) {
		var centroCasa = {
			coordenadaX : casa.coordenadaX + Constants.LARGURA_PADRAO / 2,
			coordenadaY : casa.coordenadaY + Constants.ALTURA_PADRAO / 2
		};
		peca.coordenadaX = centroCasa.coordenadaX;
		peca.coordenadaY = centroCasa.coordenadaY;
		casa.idPeca = peca.id;
	}

	return PecaService;
});
