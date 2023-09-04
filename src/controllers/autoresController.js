import Error404 from "../erros/Error404.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();
      
      req.resultado = autoresResultado;

      next();
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autoresResultado = await autores.findById(id);

      if (!autoresResultado)
        return next(new Error404("Id do Autor não localizado."));

      res.status(200).json(autoresResultado);

    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresResultado = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (!autoresResultado)
        return next(new Error404("Id do Autor não localizado."));

      res.status(200).json({ message: "Autor atualizado com sucesso." });
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresResultado = await autores.findByIdAndDelete(id);

      if (!autoresResultado)
        return next(new Error404("Id do Autor não localizado."));
    
      res.status(200).json({ message: "Autor excluído com sucesso." });
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;