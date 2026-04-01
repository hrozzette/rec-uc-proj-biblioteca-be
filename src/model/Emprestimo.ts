import type { EmprestimoDTO } from "../Interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Emprestimo {
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;
    private situacao: boolean = true;

    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string
    ) {
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmprestimo;
        this.dataDevolucao = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo;
    }

    // ============================
    // LISTAR TODOS
    // ============================
    static async listarEmprestimos(): Promise<Array<EmprestimoDTO>> {
        try {
            const listaEmprestimo: Array<EmprestimoDTO> = [];

            const query = `
            SELECT 
                em.id_emprestimo,
                em.id_aluno,
                a.nome,
                em.id_livro,
                l.titulo,
                em.data_emprestimo,
                em.data_devolucao,
                em.status_emprestimo,
                em.situacao
            FROM emprestimo em
            JOIN aluno a ON em.id_aluno = a.id_aluno
            JOIN livro l ON em.id_livro = l.id_livro;
            `;

            const respostaBD = await database.query(query);

            respostaBD.rows.forEach((e) => {
                listaEmprestimo.push({
                    idEmprestimo: e.id_emprestimo,
                    idAluno: e.id_aluno,
                    nomeAluno: e.nome,
                    idLivro: e.id_livro,
                    tituloLivro: e.titulo,
                    dataEmprestimo: e.data_emprestimo,
                    dataDevolucao: e.data_devolucao,
                    statusEmprestimo: e.status_emprestimo,
                    situacao: e.situacao
                });
            });

            return listaEmprestimo;

        } catch (error) {
            console.error("Erro ao listar empréstimos:", error);
            return []; // ✅ nunca null
        }
    }

    // ============================
    // LISTAR POR ID
    // ============================
    static async listarEmprestimoId(idEmprestimo: number): Promise<EmprestimoDTO | null> {
        try {
            const query = `
            SELECT
                em.id_emprestimo,
                em.id_aluno,
                a.nome,
                em.id_livro,
                l.titulo,
                em.data_emprestimo,
                em.data_devolucao,
                em.status_emprestimo,
                em.situacao
            FROM emprestimo em
            JOIN aluno a ON em.id_aluno = a.id_aluno
            JOIN livro l ON em.id_livro = l.id_livro
            WHERE em.id_emprestimo = $1;
            `;

            const respostaBD = await database.query(query, [idEmprestimo]);

            if (respostaBD.rows.length === 0) {
                return null;
            }

            const e = respostaBD.rows[0];

            return {
                idEmprestimo: e.id_emprestimo,
                idAluno: e.id_aluno,
                nomeAluno: e.nome,
                idLivro: e.id_livro,
                tituloLivro: e.titulo,
                dataEmprestimo: e.data_emprestimo,
                dataDevolucao: e.data_devolucao,
                statusEmprestimo: e.status_emprestimo,
                situacao: e.situacao
            };

        } catch (error) {
            console.error("Erro ao buscar empréstimo:", error);
            return null; // ✅ correto
        }
    }

    // ============================
    // CADASTRAR
    // ============================
    static async cadastrarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const query = `
            INSERT INTO emprestimo 
            (id_aluno, id_livro, data_emprestimo, data_devolucao) 
            VALUES ($1, $2, $3, $4)
            RETURNING id_emprestimo;
            `;

            const respostaBD = await database.query(query, [
                emprestimo.idAluno,
                emprestimo.idLivro,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
            ]);

            return respostaBD.rows.length > 0;

        } catch (error) {
            console.error("Erro ao cadastrar empréstimo:", error);
            return false;
        }
    }

    // ============================
    // ATUALIZAR
    // ============================
    static async atualizarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const query = `
            UPDATE emprestimo 
            SET 
                id_aluno = $1,
                id_livro = $2,
                data_emprestimo = $3,
                data_devolucao = $4,
                status_emprestimo = $5
            WHERE id_emprestimo = $6;
            `;

            const respostaBD = await database.query(query, [
                emprestimo.idAluno,
                emprestimo.idLivro,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.statusEmprestimo,
                emprestimo.idEmprestimo
            ]);

            return respostaBD.rowCount !== 0;

        } catch (error) {
            console.error("Erro ao atualizar empréstimo:", error);
            return false;
        }
    }

    // ============================
    // REMOVER (SOFT DELETE)
    // ============================
    static async removerEmprestimo(idEmprestimo: number): Promise<boolean> {
        try {
            const query = `
            UPDATE emprestimo 
            SET situacao = FALSE 
            WHERE id_emprestimo = $1;
            `;

            const respostaBD = await database.query(query, [idEmprestimo]);

            return respostaBD.rowCount !== 0;

        } catch (error) {
            console.error("Erro ao remover empréstimo:", error);
            return false;
        }
    }
}

export default Emprestimo;