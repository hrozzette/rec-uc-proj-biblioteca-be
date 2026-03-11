export interface LivroDTO {
    idLivro?: number;
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: string;
    isbn: string;
    quantTotal: number;
    quantDisponivel: number;
    valorAquisicao: number;
    statusLivroEmprestado: string;
    situacao?: boolean
}