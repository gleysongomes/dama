define(function() {

	var TabuleiroModel = function() {
		this.canvas = null;
		this.ctx = null;
		this.casas = null;
		this.pecas = null;
		this.casasReceberPecasAzuis = null;
		this.casasReceberPecasPretas = null;
	}

	var TabuleiroModel = function(canvas, ctx, casas, casasReceberPecasAzuis, casasReceberPecasPretas, pecas) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.casas = casas;
		this.casasReceberPecasAzuis = casasReceberPecasAzuis;
		this.casasReceberPecasPretas = casasReceberPecasPretas;
		this.pecas = pecas;
	}

	return TabuleiroModel;
});
