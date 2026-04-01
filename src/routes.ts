
import { Router } from "express"; //Importa o módulo Router do express
import type { Request, Response } from "express"; //Importa os módulos de requisição e resposta
import AlunoController from "./Controller/AlunoController.js";
import LivroController from "./Controller/LivroController.js";
import EmprestimoController from "./Controller/EmprestimoController.js";

const router = Router(); //Cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({mensagem: "Olá, seja bem-vindo!"})
});

router.get("/api/alunos", AlunoController.listarTodos);
router.get("/api/alunos/:idAluno", AlunoController.listarAluno);
router.post("/api/alunos", AlunoController.novoAluno);
router.put("/api/alunos/:idAluno", AlunoController.atualizar);
router.delete("/api/alunos/:idAluno", AlunoController.remover);

router.get("/api/livros", LivroController.listarTodos);
router.get("/api/livros/:idLivro", LivroController.listarLivro);
router.post("/api/livros", LivroController.novoLivro);
router.put("/api/livros/:idLivro", LivroController.atualizar);
router.delete("/api/livros/:idLivro", LivroController.remover);

router.get("/api/emprestimos", EmprestimoController.listarTodos);
router.get("/api/emprestimos/:idEmprestimo", EmprestimoController.listarEmprestimo);
router.post("/api/emprestimos", EmprestimoController.novoEmprestimo);
router.put("/api/emprestimos/:idEmprestimo", EmprestimoController.atualizar);
router.delete("/api/emprestimos/:idEmprestimo", EmprestimoController.remover);

export {router};