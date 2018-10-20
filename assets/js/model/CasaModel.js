define(function() {
	var CasaModel = function(id, celula, ponto, dimensao, cor) {
		this.id = id;
		this.cor = cor;
		this.peca = null;
		this.ponto = ponto;
		this.celula = celula;
		this.dimensao = dimensao;
	}
	return CasaModel;
});
