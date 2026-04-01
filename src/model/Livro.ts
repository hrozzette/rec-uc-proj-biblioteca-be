import { DatabaseModel } from "./DatabaseModel.js";
import type { LivroDTO } from "../Interface/LivroDTO.js";

const database = new DatabaseModel().pool;

class Livro {
    // Atributos
    private idLivro: number = 0;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private quantTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestado: string;
    private situacao: boolean = true;

    // Construtor
    constructor(
        _titulo: string,
        _autor: string,
        _editora: string,
        _anoPublicacao: string,
        _isbn: string,
        _quantTotal: number,
        _quantDisponivel: number,
        _valorAquisicao: number,
        _statusLivroEmprestado: string
    ) {
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora = _editora;
        this.anoPublicacao = _anoPublicacao;
        this.isbn = _isbn;
        this.quantTotal = _quantTotal;
        this.quantDisponivel = _quantDisponivel;
        this.valorAquisicao = _valorAquisicao;
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }

    // Getters e Setters

    // ID do Livro
    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(id_livro: number): void {
        this.idLivro = id_livro;
    }

    // Título
    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    // Autor
    public getAutor(): string {
        return this.autor;
    }

    public setAutor(autor: string): void {
        this.autor = autor;
    }

    // Editora
    public getEditora(): string {
        return this.editora;
    }

    public setEditora(editora: string): void {
        this.editora = editora;
    }

    // Ano de Publicação
    public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }   

    public setAnoPublicacao(ano_publicacao: string): void {
        this.anoPublicacao = ano_publicacao;
    }

    // ISBN
    public getIsbn(): string {
        return this.isbn;
    }

    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    // Quantidade Total
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    public setQuantTotal(quant_total: number): void {
        this.quantTotal = quant_total;
    }

    // Quantidade Disponível
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }   

    public setQuantDisponivel(quant_disponivel: number): void {
        this.quantDisponivel = quant_disponivel;
    }

    // Valor de Aquisição
    public getValorAquisicao(): number { 
        return this.valorAquisicao;
    }
    public setValorAquisicao(valor_aquisicao: number): void {
        this.valorAquisicao = valor_aquisicao;
    }

    // Status do Livro Emprestado
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    public setStatusLivroEmprestado(status_livro_emprestado: string): void {
        this.statusLivroEmprestado = status_livro_emprestado;
    }

    // Situação
    public getSituacao(): boolean {
        return this.situacao;
    }

    public setSituacao(situacao: boolean): void {
        this.situacao = situacao;
    }

    static async listarLivros(): Promise<Array<Livro> | null> {
        try {
            let listaDeLivros: Array<Livro> = [];
            const querySelectLivros = "SELECT * FROM Livro ORDER BY id_livro ASC;";
            const respostaBD = await database.query(querySelectLivros);

            respostaBD.rows.forEach((LivroBD) => {
                const novoLivro = new Livro(
                    LivroBD.titulo,
                    LivroBD.autor,
                    LivroBD.editora,
                    LivroBD.ano_publicacao,
                    LivroBD.isbn,
                    LivroBD.quant_total,
                    LivroBD.quant_disponivel,
                    LivroBD.valor_aquisicao,
                    LivroBD.status_livro_emprestado
                );

                novoLivro.setIdLivro(LivroBD.id_livro);
               

                listaDeLivros.push(novoLivro);
            });

            return listaDeLivros;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return null;
        }
    }

    static async listarLivroId(idLivro: number): Promise<Livro | null> {
        try {
            const querySelectLivro = "SELECT * FROM Livro WHERE id_livro = $1;";
            const respostaBD = await database.query(querySelectLivro, [idLivro]);

            if (respostaBD.rowCount != 0) {
                const livro: Livro = new Livro(
                    respostaBD.rows[0].titulo,
                    respostaBD.rows[0].autor,
                    respostaBD.rows[0].editora,
                    respostaBD.rows[0].ano_publicacao,
                    respostaBD.rows[0].isbn,    
                    respostaBD.rows[0].quant_total,
                    respostaBD.rows[0].quant_disponivel,
                    respostaBD.rows[0].valor_aquisicao,
                    respostaBD.rows[0].status_livro_emprestado
                );

                livro.setIdLivro(respostaBD.rows[0].id_livro);
                livro.setSituacao(respostaBD.rows[0].situacao);
                return livro;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar livro no banco de dados. ${error}`);
            return null;
        }
    }

    static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
        try {
            const queryInsertLivro = `INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
                            VALUES
                            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            RETURNING id_livro;`;

            const respostaBD = await database.query(queryInsertLivro, [
                livro.titulo,
                livro.autor,
                livro.editora,
                livro.anoPublicacao,
                livro.isbn,
                livro.quantTotal,
                livro.quantDisponivel,
                livro.valorAquisicao,
                livro.statusLivroEmprestado
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(
                    `Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_livro}`
                );
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async atualizarLivro(livro: LivroDTO): Promise<boolean> {
        try {
            const queryUpdateLivro = `UPDATE Livro SET titulo = $1, autor = $2, editora = $3, ano_publicacao = $4, isbn = $5, quant_total = $6, quant_disponivel = $7, valor_aquisicao = $8, status_livro_emprestado = $9 WHERE id_livro = $10;`;

            const respostaBD = await database.query(queryUpdateLivro, [
                livro.titulo,
                livro.autor,
                livro.editora,
                livro.anoPublicacao,
                livro.isbn,
                livro.quantTotal,
                livro.quantDisponivel,
                livro.valorAquisicao,
                livro.statusLivroEmprestado,
                livro.idLivro
            ]);

            if (respostaBD.rowCount != 0) {
                console.info(`Livro atualizado com sucesso. ID: ${livro.idLivro}`);
                return true;
            }

            return false;
            
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async removerLivro(idLivro: number): Promise<boolean> {
        try {
            const queryDeleteLivro = `DELETE FROM Livro WHERE id_livro = $1;`

            const respostaBD = await database.query(queryDeleteLivro, [idLivro])

            if (respostaBD.rowCount != 0) {
                console.info(`Livro removido com sucesso.`)
                return true;
            }

            return false;

        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

}

export default Livro;