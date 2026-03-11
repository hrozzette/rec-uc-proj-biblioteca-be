export interface AlunoDTO {
    idAluno?: number;
    ra: string;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    endereco: string;
    email: string;
    celular: string;
    situacao?: boolean;
}