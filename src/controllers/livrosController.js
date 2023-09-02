import Error404 from "../erros/Error404.js";
import { autores, livros } from "../models/index.js";

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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca == null)
        return res.status(200).send([]);

      const livrosResultado = await livros
        .find(busca)
        .populate("autor");

      if (!livrosResultado)
        return next(new Error404("Editora não encontrado"));

      res.status(200).json(livrosResultado);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao encontrar livro por editora.` });
    }

  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  // const regex = new RegExp(titulo, "i"); regex com js puro

  let busca = {};


  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //regex com mongo

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // if (minPaginas) busca.numeroPaginas = { $gte: minPaginas }; //gte = Greater Than or Equal = Maior ou igual que
  // if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas }; //lte = Less Than or Equal = Menor ou Igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null)
      busca.autor = autor._id;
    else 
      busca = null;
  } 

  return busca;
}

export default LivroController;