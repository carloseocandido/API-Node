import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    // let { limite = 5, pagina = 1, campoOrdenacao = "_id", ordem = -1 } = req.query;
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    if (limite <= 0 || pagina <= 0)
      return next(new RequisicaoIncorreta());

    const resultado = req.resultado;

    const resultadoPaginado = await resultado.find()
      .sort({ [campoOrdenacao]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .exec();

    res.status(200).json(resultadoPaginado);
  } catch (err) {
    next(err);
  }
}

export default paginar;