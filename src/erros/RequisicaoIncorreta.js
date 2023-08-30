import ErroBase from "./erroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(menssagem = "Um ou mais dados fornecidos estão incorretos.") {
    super(menssagem, 400);
  }
}

export default RequisicaoIncorreta;