export interface EmprestimoDTO {
    idEmprestimo?: number;
    idAluno: number;
    idLivro: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    statusEmprestimo: string;
    nomeAluno?: string;
    tituloLivro?: string;
    situacao?: boolean
}