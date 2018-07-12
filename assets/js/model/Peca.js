define(function() {
	var Peca = function(id, coordenadaX, coordenadaY, raio, cor) {
		this.id = id;
		this.coordenadaX = coordenadaX;
		this.coordenadaY = coordenadaY;
		this.raio = raio;
		this.cor = cor;
		this.anguloInicial = 0;
		this.anguloFinal = 2 * Math.PI;
		this.pressionada = false;
	}
	return Peca;
});
