import Error404 from "../erros/Error404.js";

function manipulador404(req, res, next) {
  const erro404 = new Error404();
  next(erro404);
}

export default manipulador404;