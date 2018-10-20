define(function(require) {
	
	var TabuleiroService = function() {
	}

	TabuleiroService.criarTabuleiro = function(canvas, ctx) {
		return {
			canvas: canvas,
			ctx: ctx,
			casas : CasaService.adicionarCasasTabuleiro(ctx),
			pecas : PecaService.adicionarPecasTabuleiro(ctx, casas),
			casasReceberPecasAzuis : CasaService.adicionarCasasReceberPecasPretas(ctx),
			casasReceberPecasPretas : CasaService.adicionarCasasReceberPecasAzuis(ctx)
		}
	}

	TabuleiroService.reconstruirTabuleiro = function(pecas, ctx) {
		ctx.clearRect(0, 0, Constants.LARGURA_TABULEIRO, Constants.ALTURA_TABULEIRO);
		ctx.beginPath();
		ctx.fillStyle = Constants.COR_BACKGROUND_TABULEIRO;
		ctx.fillRect(0, 0, Constants.LARGURA_TABULEIRO, Constants.ALTURA_TABULEIRO);
		ctx.closePath();

		CasaController.adicionarCasasTabuleiro(ctx);
		CasaController.adicionarCasasReceberPecasPretas(ctx);
		CasaController.adicionarCasasReceberPecasAzuis(ctx);
		PecaController.reposicionarPecasTabuleiro(ctx, pecas);
	}

	return TabuleiroService;
});
