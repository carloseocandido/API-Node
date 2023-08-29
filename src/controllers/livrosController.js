import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {

    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao buscar livros.` });
    }

  };

  static listarLivroPorId = async (req, res) => {

    try {
      const id = req.params.id;
      const livro = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livro);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao buscar livro.` });
    }

  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao cadastrar livro.` });
    }

  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json({ message: "Livro atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao atualizar livro.` });
    }

  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluído com sucesso." });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao excluir livro.` });
    }

  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;

      const livro = await livros.find({ "editora": editora }, {});
      res.status(200).json(livro);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao encontrar livro por editora.` });
    }

  };
}

export default LivroController;