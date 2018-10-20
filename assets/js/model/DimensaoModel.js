define(function(){

    var DimensaoModel = function(largura, altura){
        this.largura = largura;
        this.altura = altura;
    }

    var DimensaoModel = function(raio){
        this.raio = raio;
        this.anguloInicial = 0;
        this.anguloFinal = 2 * Math.PI;
    }

    /*return {
        casa : function(largura, altura)  {
            return {
                largura : largura,
                altura : altura
            }
        },
        peca : function(raio){
            return {
                raio : raio,
                anguloInicial : 0,
                anguloFinal : 2 * Math.PI
            }
        }
    }*/

    return DimensaoModel;

});
