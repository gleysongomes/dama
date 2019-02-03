define(function (require) {

	var Constants = require("util/Constants");
	var CasaService = require("service/CasaService");
	var PecaService = require("service/PecaService");

	var TabuleiroService = function () {}

	TabuleiroService.criarTabuleiro = function (canvas, ctx) {
		let casas = CasaService.adicionarCasasTabuleiro(ctx);
		let pecas = PecaService.adicionarPecasTabuleiro(ctx, casas);
		let casasReceberPecasAzuis = CasaService.adicionarCasasReceberPecasPretas(ctx);
		let casasReceberPecasPretas = CasaService.adicionarCasasReceberPecasAzuis(ctx);
		return {
			canvas: canvas,
			ctx: ctx,
			casas: casas,
			pecas: pecas,
			casasReceberPecasAzuis: casasReceberPecasAzuis,
			casasReceberPecasPretas: casasReceberPecasPretas
		}
	}

	TabuleiroService.reconstruirTabuleiro = function (pecas, ctx) {
		ctx.clearRect(0, 0, Constants.LARGURA_TABULEIRO, Constants.ALTURA_TABULEIRO);
		ctx.beginPath();
		ctx.fillStyle = Constants.COR_BACKGROUND_TABULEIRO;
		ctx.fillRect(0, 0, Constants.LARGURA_TABULEIRO, Constants.ALTURA_TABULEIRO);
		ctx.closePath();

		CasaService.adicionarCasasTabuleiro(ctx);
		CasaService.adicionarCasasReceberPecasPretas(ctx);
		CasaService.adicionarCasasReceberPecasAzuis(ctx);
		PecaService.reposicionarPecasTabuleiro(ctx, pecas);
	}

	return TabuleiroService;
});