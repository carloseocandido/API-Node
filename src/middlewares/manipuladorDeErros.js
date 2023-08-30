import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next) {
  console.log(err);

  if (err instanceof mongoose.Error.CastError)
    return res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });

  if (err instanceof mongoose.Error.ValidationError) {
    const messagensErro = Object.values(err.errors)
      .map(erro => erro.message)
      .join("; ");
    return res.status(400).send({ message: `Os seguintes erros foram encontrados: ${messagensErro}`});
  }

  res.status(500).json({ message: `${err.message} - Erro interno de servidor.` });
}


export default manipuladorDeErros;