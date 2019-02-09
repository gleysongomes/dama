define(function (require) {
    let Constants = require("util/Constants");
    let JogadorService = function () {}
    JogadorService.clicouSobrePeca = function (peca, coordenadaXAnteriorMouse, coordenadaYAnteriorMouse) {
        if (Math.sqrt(((peca.coordenadaX - coordenadaXAnteriorMouse) * (peca.coordenadaX - coordenadaXAnteriorMouse)) + ((peca.coordenadaY - coordenadaYAnteriorMouse) * (peca.coordenadaY - coordenadaYAnteriorMouse))) < Constants.RAIO_PADRAO) {
            return true;
        }
        return false;
    }
    return JogadorService;
});