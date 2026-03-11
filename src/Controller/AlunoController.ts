import type { AlunoDTO } from "../Interface/AlunoDTO.js";
import Aluno from "../model/Aluno.js";
import type { Request, Response } from "express";


class AlunoController extends Aluno {
    
    static async listarTodos(req: Request, res: Response): Promise<Response> {
        try {
            const listaAlunos: Array<Aluno> | null = await Aluno.listarAlunos();

            return res.status(200).json(listaAlunos);

        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de Alunos." });
        }
    }

    static async listarAluno(req: Request, res: Response): Promise<Response> {
        try {
            const idAluno: number = parseInt(req.params.idAluno as string);

            if (isNaN(idAluno) || idAluno <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo = await Aluno.listarAlunoId(idAluno);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum aluno encontrado com o ID fornecido." });
            }

            return res.status(200).json(respostaModelo);

        } catch (error) {
            console.error(`Erro ao acessar o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o aluno. "});
        }        
    }

    static async novoAluno(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosAluno = req.body;
            const respostaModelo = await Aluno.cadastrarAluno(dadosRecebidosAluno);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso."});
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar aluno."});
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o aluno."});
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const idAluno: number = parseInt(req.params.idAluno as string);
            const aluno: AlunoDTO = req.body;
            aluno.idAluno = idAluno;

            if (isNaN(aluno.idAluno) || aluno.idAluno <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo: boolean = await Aluno.atualizarAluno(aluno);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: `Aluno atualizado com sucesso.`});
            } else {
                return res.status(400).json({ mensagem: "Não foi possível atualizar o aluno, verifique se as informações fornecidas estão corretas."});
            }

            } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível atualizar o aluno."});
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAluno: number = parseInt(req.params.idAluno as string);

            if (isNaN(idAluno) || idAluno <= 0) {
                return res.status(400).json({ mensagem: "ID inválido"});
            }

            const respostaModelo: boolean = await Aluno.removerAluno(idAluno);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: `Aluno removido com sucesso.`});
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o aluno."});
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o aluno."});
        }
    }
    
}

export default AlunoController;