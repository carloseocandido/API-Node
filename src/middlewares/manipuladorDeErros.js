import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import Error404 from "../erros/Error404.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next) {
  console.log(err);

  if (err instanceof mongoose.Error.CastError)
    return new RequisicaoIncorreta().enviarResposta(res);

  if (err instanceof mongoose.Error.ValidationError) 
    return new ErroValidacao(err).enviarResposta(res);

  if (err instanceof Error404)
    return err.enviarResposta(res);

  new ErroBase().enviarResposta(res);
}


export default manipuladorDeErros;