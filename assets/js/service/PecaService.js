define(function (require) {

	var Constants = require("util/Constants");
	var PecaModel = require("model/PecaModel");
	var PontoModel = require("model/PontoModel");
	var DimensaoModel = require("model/DimensaoModel");

	var PecaService = function () {}

	PecaService.criarPecas = function (casas) {
		let opts = {
			indice: 0,
			linha: 0
		};
		let tabuleiro = {
			casas: casas,
			pecas: []
		};
		let pecaDto = {
			id: 0,
			cor: "",
			ponto: {
				x: 390,
				y: 90
			}
		};
		for (let i = 0; i < tabuleiro.casas.length; i++) {
			if (i > 0 && i % 8 == 0) {
				opts.linha++;
				pecaDto.ponto.x = 390;
				pecaDto.ponto.y += 80;
			}
			if (opts.linha < 3) {
				opts.indice = i;
				pecaDto.cor = "black";
				if (PecaService.criou(tabuleiro, pecaDto, opts)) {
					pecaDto.id++;
				}
			}
			if (opts.linha > 4) {
				opts.indice = i;
				pecaDto.cor = "#5f9ea0";
				if (PecaService.criou(tabuleiro, pecaDto, opts)) {
					pecaDto.id++;
				}
			}
			pecaDto.ponto.x += 80;
		}
		return tabuleiro.pecas;
	}

	PecaService.criou = function (tabuleiro, pecaDto, opts) {
		var valida = false;
		if (opts.linha % 2 == 0) {
			if (opts.indice % 2 == 1) {
				valida = true;
			}
		} else {
			if (opts.indice % 2 == 0) {
				valida = true;
			}
		}
		if (valida) {
			let ponto = new PontoModel(pecaDto.ponto.x, pecaDto.ponto.y);
			let dimensao = new DimensaoModel(Constants.RAIO_PADRAO);
			let peca = new PecaModel(pecaDto.id, dimensao, ponto, pecaDto.cor);
			tabuleiro.casas[opts.indice].peca = peca;
			tabuleiro.pecas.push(peca);
			return true;
		} else {
			return false;
		}
	}

	PecaService.atualizarPosicaoPeca = function (pecas, coordenadaXAnteriorMouse, coordenadaYAnteriorMouse, coordenadaXAtualMouse, coordenadaYAtualMouse) {
		var novaCoordenadaXPeca = coordenadaXAtualMouse - coordenadaXAnteriorMouse;
		var novaCoordenadaYPeca = coordenadaYAtualMouse - coordenadaYAnteriorMouse;
		for (let i = 0; i < pecas.length; i++) {
			var peca = pecas[i];
			if (peca.pressionada) {
				peca.coordenadaX += novaCoordenadaXPeca;
				peca.coordenadaY += novaCoordenadaYPeca;
			}
		}
	}

	PecaService.pecaSobrepostaCasa = function (casas, peca) {
		for (let i = 0; i < casas.length; i++) {
			var centroCasa = {
				coordenadaX: casas[i].coordenadaX + Constants.LARGURA_PADRAO / 2,
				coordenadaY: casas[i].coordenadaY + Constants.ALTURA_PADRAO / 2
			};
			if (Math.sqrt(((peca.coordenadaX - centroCasa.coordenadaX) * (peca.coordenadaX - centroCasa.coordenadaX)) + ((peca.coordenadaY - centroCasa.coordenadaY) * (peca.coordenadaY - centroCasa.coordenadaY))) < Constants.RAIO_PADRAO) {
				casas[i].idPeca = peca.id;
				for (let j = 0; j < casas.length; j++) {
					if (casas[j].id != casas[i].id && casas[j].idPeca == casas[i].idPeca) {
						casas[j].idPeca = -1;
					}
				}
				return true;
			}
		}
		return false;
	}

	PecaService.verificarPecaConquistadaCasaAnteiorCasaOrigem = function (casas, pecas, casasReceberPecasPretas, casasReceberPecasAzuis, casaOrigem, idCasa, n) {
		if (casaOrigem.id % n > casas[idCasa].id % n) {
			n = n + 1;
		} else {
			n = n - 1;
		}
		if (casas[idCasa + n].idPeca != -1 && casas[idCasa + 2 * n].idPeca == -1) {
			if (pecas[casas[idCasa + n].idPeca].cor == "black") {
				PecaService.inserirPecaCasa(casas, PecaService.casaLivre(casasReceberPecasPretas), pecas[casas[idCasa + n].idPeca]);
			} else {
				PecaService.inserirPecaCasa(casas, PecaService.casaLivre(casasReceberPecasAzuis), pecas[casas[idCasa + n].idPeca]);
			}
			return true;
		}
		return false;
	}

	PecaService.verificarPecaConquistadaCasaPosteriorCasaOrigem = function (casas, pecas, casasReceberPecasPretas, casasReceberPecasAzuis, casaOrigem, idCasa, n) {
		if (casaOrigem.id % n > casas[idCasa].id % n) {
			n = n - 1;
		} else {
			n = n + 1;
		}
		if (casas[idCasa - n].idPeca != -1 && casas[idCasa - 2 * n].idPeca == -1) {
			if (pecas[casas[idCasa - n].idPeca].cor == "black") {
				PecaService.inserirPecaCasa(casas, PecaService.casaLivre(casasReceberPecasPretas), pecas[casas[idCasa - n].idPeca]);
			} else {
				PecaService.inserirPecaCasa(casas, PecaService.casaLivre(casasReceberPecasAzuis), pecas[casas[idCasa - n].idPeca]);
			}
			return true;
		}
		return false;
	}

	PecaService.pecaConquistada = function (casas, pecas, casasReceberPecasPretas, casasReceberPecasAzuis, casaOrigem, pecaSelecionada) {
		for (let i = 0; i < casas.length; i++) {
			if (casas[i].idPeca == pecaSelecionada.id) {
				if (casas[i].id > casaOrigem.id) {
					return PecaService.verificarPecaConquistadaCasaPosteriorCasaOrigem(casas, pecas, casasReceberPecasPretas, casasReceberPecasAzuis, casaOrigem, i, Constants.NUMERO_PECAS_LINHA);
				} else {
					return PecaService.verificarPecaConquistadaCasaAnteiorCasaOrigem(casas, pecas, casasReceberPecasPretas, casasReceberPecasAzuis, casaOrigem, i, Constants.NUMERO_PECAS_LINHA);
				}
			}
		}
		return false;
	}

	PecaService.casaLivre = function (casas) {
		for (let i = 0; i < casas.length; i++) {
			if (casas[i].idPeca == -1) {
				return casas[i];
			}
		}
		return null;
	}

	PecaService.removerPecaCasaOrigem = function (casas, peca) {
		for (let i = 0; i < casas.length; i++) {
			if (casas[i].idPeca == peca.id) {
				casas[i].idPeca = -1;
				break;
			}
		}
	}

	PecaService.inserirPecaCasa = function (casas, casa, peca) {
		var centroCasa = {
			coordenadaX: casa.coordenadaX + Constants.LARGURA_PADRAO / 2,
			coordenadaY: casa.coordenadaY + Constants.ALTURA_PADRAO / 2
		};
		peca.coordenadaX = centroCasa.coordenadaX;
		peca.coordenadaY = centroCasa.coordenadaY;
		casa.idPeca = peca.id;
		PecaService.removerPecaCasaOrigem(casas, peca);
	}

	PecaService.adicionarPecasTabuleiro = function (ctx, casas) {
		var pecas = PecaService.criarPecas(casas);
		for (i = 0; i < pecas.length; i++) {
			PecaService.adicionarPecaTabuleiro(ctx, pecas[i]);
		}
		return pecas;
	}

	PecaService.adicionarPecaTabuleiro = function (ctx, peca) {
		ctx.beginPath();
		ctx.fillStyle = peca.cor;
		ctx.arc(peca.ponto.x, peca.ponto.y, peca.dimensao.raio, peca.dimensao.anguloInicial, peca.dimensao.anguloFinal);
		ctx.fill();
		ctx.closePath();
	}

	PecaService.reposicionarPecasTabuleiro = function (ctx, pecas) {
		for (i = 0; i < pecas.length; i++) {
			PecaService.adicionarPecaTabuleiro(ctx, pecas[i]);
		}
	}

	PecaService.mouseSobrepostoPeca = function (pecas, mouse) {
		for (i = 0; i < pecas.length; i++) {
			if (Math.sqrt(((mouse.coordenadaX - pecas[i].ponto.x) * (mouse.coordenadaX - pecas[i].ponto.x)) + ((mouse.coordenadaY - pecas[i].ponto.y) * (mouse.coordenadaY - pecas[i].ponto.y))) < Constants.RAIO_PADRAO) {
				return true;
			}
		}
		return false;
	}

	return PecaService;
});