define(function (require) {

	var CasaModel = require("model/CasaModel");
	var Constants = require("util/Constants");

	var CasaService = function () {}

	CasaService.criarCasas = function (k, x, y, n) {
		let casas = [],
			coordenadaX = x,
			coordenadaY = y,
			linha = 0,
			coluna = 0,
			corSelecionada = "";
		for (let i = 0; i < n; i++) {
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

			let ponto = {
				x: coordenadaX,
				y: coordenadaY
			};

			let dimensao = {
				largura: Constants.LARGURA_PADRAO,
				altura: Constants.ALTURA_PADRAO
			};

			let celula = {
				linha: linha,
				coluna: coluna
			};

			let casaModel = {
				id: i,
				celula: celula,
				ponto: ponto,
				dimensao: dimensao,
				cor: corSelecionada
			};

			casas.push(casaModel);
			coluna++;
			coordenadaX += 80;
		}
		return casas;
	}

	CasaService.adicionarCasasTabuleiro = function (ctx) {
		var casas = CasaService.criarCasas(Constants.NUMERO_PECAS_LINHA, 350, 50, Constants.NUMERO_CASAS);
		for (let i = 0; i < casas.length; i++) {
			CasaService.adicionarCasaTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaService.adicionarCasasReceberPecasPretas = function (ctx) {
		var casas = CasaService.criarCasas(3, 50, 50, 12);
		for (let i = 0; i < casas.length; i++) {
			CasaService.adicionarCasaSemCorTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaService.adicionarCasasReceberPecasAzuis = function (ctx) {
		var casas = CasaService.criarCasas(3, 1050, 50, 12);
		for (let i = 0; i < casas.length; i++) {
			CasaService.adicionarCasaSemCorTabuleiro(ctx, casas[i]);
		}
		return casas;
	}

	CasaService.adicionarCasaTabuleiro = function (ctx, casa) {
		ctx.beginPath();
		ctx.fillStyle = casa.cor;
		ctx.fillRect(casa.ponto.x, casa.ponto.y, casa.dimensao.largura, casa.dimensao.altura);
		ctx.closePath();
	}

	CasaService.adicionarCasaSemCorTabuleiro = function (ctx, casa) {
		ctx.beginPath();
		ctx.rect(casa.ponto.x, casa.ponto.y, casa.dimensao.largura, casa.dimensao.altura);
		ctx.stroke();
		ctx.closePath();
	}

	return CasaService;
});