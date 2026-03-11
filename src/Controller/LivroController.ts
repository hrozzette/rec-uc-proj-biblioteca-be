import type { LivroDTO } from "../Interface/LivroDTO.js";
import Livro from "../model/Livro.js";
import type { Request, Response } from "express";


class LivroController extends Livro {
    
    static async listarTodos(req: Request, res: Response): Promise<Response> {
        try {
            const listaLivros: Array<Livro> | null = await Livro.listarLivros();

            return res.status(200).json(listaLivros);

        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de Livros." });
        }
    }

    static async listarLivro(req: Request, res: Response): Promise<Response> {
        try {
            const idLivro: number = parseInt(req.params.idLivro as string);

            if (isNaN(idLivro) || idLivro <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo = await Livro.listarLivroId(idLivro);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum livro encontrado com o ID fornecido." });
            }

            return res.status(200).json(respostaModelo);

        } catch (error) {
            console.error(`Erro ao acessar o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o livro. "});
        }        
    }

    static async novoLivro(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosLivro = req.body;
            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Livro cadastrado com sucesso."});
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar aluno."});
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o livro."});
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const idLivro: number = parseInt(req.params.idLivro as string);
            const livro: LivroDTO = req.body;
            livro.idLivro = idLivro;

            if (isNaN(livro.idLivro) || livro.idLivro <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo: boolean = await Livro.atualizarLivro(livro);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: `Livro atualizado com sucesso.`});
            } else {
                return res.status(400).json({ mensagem: "Não foi possível atualizar o livro, verifique se as informações fornecidas estão corretas."});
            }

            } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível atualizar o livro."});
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idLivro: number = parseInt(req.params.idLivro as string);

            if (isNaN(idLivro) || idLivro <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo: boolean = await Livro.removerLivro(idLivro);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: `Livro removido com sucesso.`});
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o livro."});
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o livro."});
        }
    }

}

export default LivroController;