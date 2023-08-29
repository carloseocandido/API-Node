import autores from "../models/Autor.js";

class AutorController {

  //Usando Promises
  static listarAutores = (req, res) => {
    autores.find().then(autores => {
      res.status(200).json(autores);
    })
      .catch(err => {
        res.status(500).json({ message: `${err.message} - falha ao cadastrar autor` });
      });
  };

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id)
      .then(autor => {
        res.status(200).json(autor);
      })
      .catch(err => {
        res.status(500).json({ message: `${err.message} - falha ao buscar autor` });
      });
  };

  //Usando async
  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao cadastrar autor` });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json({ message: "autor atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao atualizar autor` });
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao excluir autor` });
    }
  };
}

export default AutorController;