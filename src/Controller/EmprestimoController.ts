import type { EmprestimoDTO } from "../Interface/EmprestimoDTO.js";
import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";


class EmprestimoController extends Emprestimo {
    
    static async listarTodos(req: Request, res: Response): Promise<Response> {
        try {
            const listaEmprestimos: Array<EmprestimoDTO> | null = await Emprestimo.listarEmprestimos();

            return res.status(200).json(listaEmprestimos);

        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de Emprestimos." });
        }
    }

    static async listarEmprestimo(req: Request, res: Response): Promise<Response> {
        try {
            const idEmprestimo: number = parseInt(req.params.id as string);

            if (isNaN(idEmprestimo) || idEmprestimo <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo = await Emprestimo.listarEmprestimoId(idEmprestimo);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum emprestimo encontrado com o ID fornecido." });
            }

            return res.status(200).json(respostaModelo);

        } catch (error) {
            console.error(`Erro ao acessar o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o emprestimo. "});
        }        
    }

    static async novoEmprestimo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosEmprestimo = req.body;
            const respostaModelo = await Emprestimo.cadastrarEmprestimo(dadosRecebidosEmprestimo);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Emprestimo cadastrado com sucesso."});
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar Emprestimo."});
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o emprestimo."});
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const idEmprestimo: number = parseInt(req.params.idEmprestimo as string);
            const emprestimo: EmprestimoDTO = req.body;
            emprestimo.idEmprestimo = idEmprestimo;

            if (isNaN(emprestimo.idEmprestimo) || emprestimo.idEmprestimo <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo: boolean = await Emprestimo.atualizarEmprestimo(emprestimo);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: `Emprestimo atualizado com sucesso.`});
            } else {
                return res.status(400).json({ mensagem: "Não foi possível atualizar o emprestimo, verifique se as informações fornecidas estão corretas."});
            }

            } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível atualizar o emprestimo."});
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idEmprestimo: number = parseInt(req.params.idEmprestimo as string);

            if (isNaN(idEmprestimo) || idEmprestimo <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo: boolean = await Emprestimo.removerEmprestimo(idEmprestimo);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: `Emprestimo removido com sucesso.`});
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o emprestimo."});
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o emprestimo."});
        }
    }

}

export default EmprestimoController;