import Error404 from "../erros/Error404.js";
import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {

    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
        
      res.status(200).json(livrosResultado);
    } catch (err) {
      next(err);
    }

  };

  static listarLivroPorId = async (req, res, next) => {

    try {
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
        
      if (!livrosResultado)
        return next(new Error404("Id do livro não encontrado"));
    
      res.status(200).json(livrosResultado);
    } catch (err) {
      next(err);
    }

  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      next(err);
    }

  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosResultado = await livros.findByIdAndUpdate(id, { $set: req.body });
      
      if (!livrosResultado)
        return next(new Error404("Id do livro não encontrado."));

      res.status(200).json({ message: "Livro atualizado com sucesso" });
    } catch (err) {
      next(err);
    }

  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosResultado = await livros.findByIdAndDelete(id);

      if (!livrosResultado)
        return next(new Error404("Id do livro não encontrado"));

      res.status(200).json({ message: "Livro excluído com sucesso." });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao excluir livro.` });
    }

  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({ "editora": editora }, {});

      if (!livrosResultado)
        return next(new Error404("Editora não encontrado"));

      res.status(200).json(livrosResultado);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao encontrar livro por editora.` });
    }

  };
}

export default LivroController;