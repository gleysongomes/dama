define(function(){
	
	var JogadorController = function(tabuleiro){
		this.pecaMovimentada = null;
		this.pecaPressionada = false;
		this.coordenadaYAnteriorMouse = 0;
		this.coordenadaXAnteriorMouse = 0;
		this.casaOrigemPecaMovida = null;
		this.tabuleiro = tabuleiro;
    }

    JogadorController.initialize = function(){
		this.tratarCliqueSobrePeca();
		this.tratarMovimentoPeca();
		this.tratarPecaMovida();
    }
	
	JogadorController.tratarCliqueSobrePeca = function(this.tabuleiro.canvas){
		var bcr = this.tabuleiro.canvas.getBoundingClientRect();
		this.tabuleiro.canvas.onmousedown = function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.coordenadaXAnteriorMouse = parseInt(e.clientX - bcr.left);
			this.coordenadaYAnteriorMouse = parseInt(e.clientY - bcr.top);
			this.casaOrigemPecaMovida = null;
			this.pecaMovimentada = null;
			this.pecaPressionada = false;
			for (let i = 0; i < this.tabuleiro.pecas.length; i++) {
				if (JogadorService.clicouSobrePeca(this.tabuleiro.pecas[i], this.coordenadaXAnteriorMouse, this.coordenadaYAnteriorMouse)) {
					this.tabuleiro.pecas[i].pressionada = true;
					this.pecaPressionada = true;
					this.pecaMovimentada = this.tabuleiro.pecas[i];
					for (let j = 0; j < this.tabuleiro.casas.length; j++) {
						if (this.tabuleiro.casas[j].peca.id == this.tabuleiro.pecas[i].id) {
							this.casaOrigemPecaMovida = this.tabuleiro.casas[j];
							break;
						}
					}
					break;
				}
			}
		}
	}

	JogadorController.tratarMovimentoPeca = function(this.tabuleiro.canvas, this.tabuleiro.ctx){
		var bcr = this.tabuleiro.canvas.getBoundingClientRect();
		this.tabuleiro.canvas.onmousemove = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var coordenadaXAtualMouse = parseInt(e.clientX - bcr.left);
			var coordenadaYAtualMouse = parseInt(e.clientY - bcr.top);
			if (PecaService.mouseSobrepostoPeca(this.tabuleiro.pecas, {
				coordenadaX : coordenadaXAtualMouse,
				coordenadaY : coordenadaYAtualMouse
			})) {
				this.tabuleiro.canvas.style.cursor = 'pointer';
			} else {
				this.tabuleiro.canvas.style.cursor = 'default';
			}
			if (this.pecaPressionada) {
				if (PecaService.pecaNaoSobrepostaOutra(this.tabuleiro.pecas, this.pecaMovimentada, {
					coordenadaX : coordenadaXAtualMouse,
					coordenadaY : coordenadaYAtualMouse
				})) {
					PecaService.atualizarPosicaoPeca(this.tabuleiro.pecas, this.coordenadaXAnteriorMouse, this.coordenadaYAnteriorMouse, coordenadaXAtualMouse, coordenadaYAtualMouse);
					TabuleiroService.reconstruirTabuleiro(this.tabuleiro.ctx);
					this.coordenadaXAnteriorMouse = coordenadaXAtualMouse;
					this.coordenadaYAnteriorMouse = coordenadaYAtualMouse;
				}
			}
		}
	}

    JogadorController.tratarPecaMovida = function(this.tabuleiro.canvas, this.tabuleiro.ctx) {
		this.tabuleiro.canvas.onmouseup = function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (PecaService.pecaSobrepostaCasa(this.tabuleiro.casas, this.pecaMovimentada)) {
				if (PecaService.pecaConquistada(this.tabuleiro.casas, this.tabuleiro.pecas, this.tabuleiro.casasReceberPecasPretas, this.tabuleiro.casasReceberPecasAzuis, this.casaOrigemPecaMovida, this.pecaMovimentada)) {
					TabuleiroService.reconstruirTabuleiro(this.tabuleiro.ctx);
				}
			}
			for (let i = 0; i < this.tabuleiro.pecas.length; i++) {
				this.tabuleiro.pecas[i].pressionada = false;
			}
			this.pecaPressionada = false;
		}
    }
    return JogadorController;
});
