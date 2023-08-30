import Error404 from "../erros/Error404.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      
      res.status(200).json(autoresResultado);
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);

      if (!autor)
        next(new Error404("Id do Autor não localizado."));

      res.status(200).json(autor);

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

      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).json({ message: "autor atualizado com sucesso." });
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);

      res.status(200).json({ message: "autor excluído com sucesso." });
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;