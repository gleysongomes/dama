define(function() {
	var PecaModel = function(id, dimensao, ponto, cor) {
		this.id = id;
		this.cor = cor;
		this.dama = false;
		this.ponto = ponto;
		this.dimensao = dimensao;
		this.pressionada = false;
	}
	return PecaModel;
});
