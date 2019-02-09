define(function (require) {
	let PecaService = require("service/PecaService");
	let JogadorService = require("service/JogadorService");

	let opts = {
		pecaMovimentada: null,
		pecaPressionada: false,
		coordenadaXAnteriorMouse: 0,
		coordenadaYAnteriorMouse: 0,
		casaOrigemPecaMovida: null,
	};

	let ObservadorController = function (tabuleiro) {
		this.tabuleiro = tabuleiro;
	}

	ObservadorController.prototype.initialize = function () {
		this.tratarCliqueSobrePeca();
		this.tratarMovimentoPeca();
		this.tratarPecaMovida();
	}

	ObservadorController.prototype.tratarCliqueSobrePeca = function () {
		let that = this;
		let bcr = this.tabuleiro.canvas.getBoundingClientRect();
		this.tabuleiro.canvas.onmousedown = function (e) {
			e.preventDefault();
			e.stopPropagation();
			opts.coordenadaXAnteriorMouse = parseInt(e.clientX - bcr.left);
			opts.coordenadaYAnteriorMouse = parseInt(e.clientY - bcr.top);
			opts.casaOrigemPecaMovida = null;
			opts.pecaMovimentada = null;
			opts.pecaPressionada = false;
			for (let i = 0; i < that.tabuleiro.pecas.length; i++) {
				if (JogadorService.clicouSobrePeca(that.tabuleiro.pecas[i], opts.coordenadaXAnteriorMouse, opts.coordenadaYAnteriorMouse)) {
					that.tabuleiro.pecas[i].pressionada = true;
					opts.pecaPressionada = true;
					opts.pecaMovimentada = that.tabuleiro.pecas[i];
					for (let j = 0; j < that.tabuleiro.casas.length; j++) {
						if (that.tabuleiro.casas[j].peca.id == that.tabuleiro.pecas[i].id) {
							opts.casaOrigemPecaMovida = that.tabuleiro.casas[j];
							break;
						}
					}
					break;
				}
			}
		}
	}

	ObservadorController.prototype.tratarMovimentoPeca = function () {
		let bcr = this.tabuleiro.canvas.getBoundingClientRect();
		let that = this;
		this.tabuleiro.canvas.onmousemove = function (e) {
			e.preventDefault();
			e.stopPropagation();
			let coordenadaXAtualMouse = parseInt(e.clientX - bcr.left);
			let coordenadaYAtualMouse = parseInt(e.clientY - bcr.top);
			if (PecaService.mouseSobrepostoPeca(that.tabuleiro.pecas, {
					coordenadaX: coordenadaXAtualMouse,
					coordenadaY: coordenadaYAtualMouse
				})) {
				that.tabuleiro.canvas.style.cursor = 'pointer';
			} else {
				that.tabuleiro.canvas.style.cursor = 'default';
			}
			if (opts.pecaPressionada) {
				if (PecaService.pecaNaoSobrepostaOutra(that.tabuleiro.pecas, opts.pecaMovimentada, {
						coordenadaX: coordenadaXAtualMouse,
						coordenadaY: coordenadaYAtualMouse
					})) {
					PecaService.atualizarPosicaoPeca(that.tabuleiro.pecas, opts.coordenadaXAnteriorMouse, opts.coordenadaYAnteriorMouse, coordenadaXAtualMouse, coordenadaYAtualMouse);
					TabuleiroService.reconstruirTabuleiro(tthat.tabuleiro.ctx);
					opts.coordenadaXAnteriorMouse = coordenadaXAtualMouse;
					opts.coordenadaYAnteriorMouse = coordenadaYAtualMouse;
				}
			}
		}
	}

	ObservadorController.prototype.tratarPecaMovida = function () {
		let that = this;
		this.tabuleiro.canvas.onmouseup = function (e) {
			e.preventDefault();
			e.stopPropagation();
			if (PecaService.pecaSobrepostaCasa(that.tabuleiro.casas, opts.pecaMovimentada)) {
				if (PecaService.pecaConquistada(that.tabuleiro.casas, that.tabuleiro.pecas, that.tabuleiro.casasReceberPecasPretas, that.tabuleiro.casasReceberPecasAzuis, opts.casaOrigemPecaMovida, opts.pecaMovimentada)) {
					TabuleiroService.reconstruirTabuleiro(that.tabuleiro.ctx);
				}
			}
			for (let i = 0; i < this.tabuleiro.pecas.length; i++) {
				that.tabuleiro.pecas[i].pressionada = false;
			}
			opts.pecaPressionada = false;
		}
	}
	return ObservadorController;
});