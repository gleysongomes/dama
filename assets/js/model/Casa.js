define(function() {
	var Casa = function(id, coordenadaX, coordenadaY, largura, altura, cor) {
		this.id = id;
		this.coordenadaX = coordenadaX;
		this.coordenadaY = coordenadaY;
		this.largura = largura;
		this.altura = altura;
		this.cor = cor;
		this.idPeca = -1;
	}
	return Casa;
});
