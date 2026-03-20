import type { EmprestimoDTO } from "../Interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Emprestimo {
    // Atributos
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;
    private situacao: boolean = true;

    // Construtor
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

    // Getters e Setters

    // ID do Empréstimo
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    // ID do Aluno
    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    // ID do Livro
    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    // Data do Empréstimo
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    // Data de Devolução
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    // Status do Empréstimo
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    // Situação
    public getSituacao(): boolean {
        return this.situacao;
    }

    public setSituacao(situacao: boolean): void {
        this.situacao = situacao;
    }

    static async listarEmprestimos(): Promise<Array<EmprestimoDTO> | null> {
        try {
            let listaEmprestimo: Array<EmprestimoDTO> = [];

            const querySelectEmprestimos = `SELECT * FROM v_emprestimos_status;`;

            const respostaBD = await database.query(querySelectEmprestimos);

            respostaBD.rows.forEach((emprestimoBD) => {
                const novoEmprestimo: EmprestimoDTO = {
                    idEmprestimo: emprestimoBD.id_emprestimo,
                    idAluno: emprestimoBD.id_aluno,
                    nomeAluno: emprestimoBD.nome,
                    idLivro: emprestimoBD.id_livro,
                    tituloLivro: emprestimoBD.titulo,
                    dataEmprestimo: emprestimoBD.data_emprestimo,
                    dataDevolucao: emprestimoBD.data_devolucao,
                    statusEmprestimo: emprestimoBD.status_emprestimo,
                    situacao: emprestimoBD.situacao
                };

                listaEmprestimo.push(novoEmprestimo);
            });

            return listaEmprestimo;


        } catch (error) {
            console.error(`Erro na consulta com o banco de dados.`, error);

            return null;
        }
}

    static async listarEmprestimoId(idEmprestimo: number): Promise<EmprestimoDTO | null> {
        try {
            let emprestimo: EmprestimoDTO | null = null;

            const querySelectEmprestimo = `
            SELECT
        em.id_emprestimo,
        em.id_aluno,
        a.nome AS nome,
        em.id_livro,
        l.titulo AS titulo,
        em.data_emprestimo,
        em.data_devolucao,
        em.status_emprestimo
    FROM emprestimo em
    JOIN aluno a ON em.id_aluno = a.id_aluno
    JOIN livro l ON em.id_livro = l.id_livro
    WHERE em.id_emprestimo = $1;`;

            const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);

            respostaBD.rows.forEach(emprestimoBD => {
                
                const novoEmprestimo: EmprestimoDTO = {
                    idEmprestimo: emprestimoBD.id_emprestimo,
                    idAluno: emprestimoBD.id_aluno,
                    nomeAluno: emprestimoBD.nome,
                    idLivro: emprestimoBD.id_livro,
                    tituloLivro: emprestimoBD.titulo,
                    dataEmprestimo: emprestimoBD.data_emprestimo,
                    dataDevolucao: emprestimoBD.data_devolucao,
                    statusEmprestimo: emprestimoBD.status_emprestimo,
                    situacao: emprestimoBD.situacao
                };

                emprestimo = novoEmprestimo;
            });

                return emprestimo;

        } catch (error) {
             console.error(`Erro na consulta com o banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarEmprestimo(
        emprestimo: EmprestimoDTO
    ): Promise<boolean> {
        try {
            const queryInsertEmprestimo = `INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao) 
                            VALUES
                            ($1, $2, $3, $4)
                            RETURNING id_emprestimo;`;

            const respostaBD = await database.query(queryInsertEmprestimo, [
                emprestimo.idAluno,
                emprestimo.idLivro,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(
                    `Emprestimo cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`
                );
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async atualizarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
    try {
        const queryUpdateEmprestimo = `
        UPDATE emprestimo 
        SET 
            id_aluno = $1, 
            id_livro = $2, 
            data_emprestimo = $3, 
            data_devolucao = $4, 
            status_emprestimo = $5 
        WHERE id_emprestimo = $6;
        `;

        const respostaBD = await database.query(queryUpdateEmprestimo, [
            emprestimo.idAluno,
            emprestimo.idLivro, 
            emprestimo.dataEmprestimo,
            emprestimo.dataDevolucao,
            emprestimo.statusEmprestimo,
            emprestimo.idEmprestimo
        ]);

        console.log("rowCount:", respostaBD.rowCount);

        if (respostaBD.rowCount != 0) {
            console.info(`Emprestimo atualizado com sucesso. ID: ${emprestimo.idEmprestimo}`);
            return true;
        }

        return false;
        
    } catch (error) {
        console.error(`Erro na consulta ao banco de dados. ${error}`);
        return false;
    }
}
    static async removerEmprestimo(idEmprestimo: number): Promise<boolean> {
        try {
            const queryDeleteEmprestimo = `UPDATE Emprestimo SET situacao = FALSE WHERE id_emprestimo = $1;`

            const respostaBD = await database.query(queryDeleteEmprestimo, [idEmprestimo])

            if (respostaBD.rowCount != 0) {
                console.info(`Emprestimo removido com sucesso.`)
                return true;
            }

            return false;

        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

}

export default Emprestimo;