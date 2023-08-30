import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(err) {
    const messagensErro = Object.values(err.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${messagensErro}`);
  }
}

export default ErroValidacao;