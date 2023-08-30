import ErroBase from "./erroBase.js";

class Error404 extends ErroBase {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem, 404);
  }
}

export default Error404;