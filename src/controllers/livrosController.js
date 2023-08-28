import livros from "../models/Livro.js";

class livroController {

    //Usando Promises
    static listarLivros = (req, res) => {
        livros.find().then(livros => {
            res.status(200).json(livros);
        })
            .catch(err => {
                res.status(500).json({ message: `${err.message} - falha ao cadastrar livro` });
            })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
            .then(livro => {
                res.status(200).json(livro);
            })
            .catch(err => {
                res.status(500).json({ message: `${err.message} - falha ao buscar livro` });
            })
    }

    //Usando async
    static cadastrarLivro = async (req, res) => {
        try {
            let livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON())
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao cadastrar livro` });
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).json({ message: 'Livro atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao atualizar livro` });
        }
    }

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro excluído com sucesso' });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao excluir livro` });
        }
    }
}

export default livroController