<<<<<<< HEAD
import type { AlunoDTO } from "../Interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {
    // Atributos
    private idAluno: number = 0;
    private ra: string;
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;
    private situacao: boolean = true;

    // Construtor
    constructor(
        _ra: string,
        _nome: string,
        _sobrenome: string,
        _dataNascimento: Date,
        _endereco: string,
        _email: string,
        _celular: string
    ) {
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.endereco = _endereco;
        this.email = _email;
        this.celular = _celular;
    }
    // Getters e Setters

    // Id do aluno
    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    // RA
    public getRa(): string {
        return this.ra;
    }

    public setRa(ra: string): void {
        this.ra = ra;
    }

    // Nome
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    // Sobrenome
    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    // Data de Nascimento
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    // Endereço
    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    // Email
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // Celular
    public getCelular(): string {
        return this.celular;
    }
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    // Situação
    public getSituacao(): boolean {
        return this.situacao;
    }
    public setSituacao(situacao: boolean): void {
        this.situacao = situacao;
    }

    static async listarAlunos(): Promise<Array<Aluno> | null> {
        try {
            let listaDeAlunos: Array<Aluno> = [];
            const querySelectAlunos = "SELECT * FROM Aluno WHERE situacao=TRUE ORDER BY id_aluno ASC;";
            const respostaBD = await database.query(querySelectAlunos);

            respostaBD.rows.forEach((alunoBD:any) => {
                const novoAluno = new Aluno(
                    alunoBD.ra,
                    alunoBD.nome,
                    alunoBD.sobrenome,
                    alunoBD.data_nascimento,
                    alunoBD.endereco,
                    alunoBD.email,
                    alunoBD.celular
                );

                novoAluno.setIdAluno(alunoBD.id_aluno);
                novoAluno.setSituacao(alunoBD.situacao);

                listaDeAlunos.push(novoAluno);
            });

            return listaDeAlunos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return null;
        }
    }

    static async listarAlunoId(idAluno: number): Promise<Aluno | null> {
        try {
            const querySelectAluno = "SELECT * FROM Aluno WHERE id_aluno = $1;";
            const respostaBD = await database.query(querySelectAluno, [idAluno]);

            if (respostaBD.rowCount != 0) {
                const aluno: Aluno = new Aluno(
                    respostaBD.rows[0].ra,
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].sobrenome,
                    respostaBD.rows[0].data_nascimento,
                    respostaBD.rows[0].endereco,
                    respostaBD.rows[0].email,
                    respostaBD.rows[0].celular
                );

                aluno.setIdAluno(respostaBD.rows[0].id_aluno);
                aluno.setSituacao(respostaBD.rows[0].situacao);
                return aluno;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar aluno no banco de dados. ${error}`);
            return null;
        }
    }

    static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
        try {
            const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
                            VALUES
                            ($1, $2, $3, $4, $5, $6)
                            RETURNING id_aluno;`;

            const respostaBD = await database.query(queryInsertAluno, [
                aluno.nome,
                aluno.sobrenome,
                aluno.dataNascimento,
                aluno.endereco,
                aluno.email,
                aluno.celular,
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(
                    `Aluno cadastrado com sucesso. ID: ${respostaBD.rows[0].id_aluno}`
                );
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async atualizarAluno(aluno: AlunoDTO): Promise<boolean> {
        try {
            const queryUpdateAluno = `UPDATE Aluno SET nome = $1, sobrenome = $2, data_nascimento = $3, endereco = $4, email = $5, celular = $6 WHERE id_aluno = $7;`;

            const respostaBD = await database.query(queryUpdateAluno, [
                aluno.nome,
                aluno.sobrenome,
                aluno.dataNascimento,
                aluno.endereco,
                aluno.email,
                aluno.celular,
                aluno.idAluno,
            ]);

            if (respostaBD.rowCount != 0) {
                console.info(`Aluno atualizado com sucesso. ID: ${aluno.idAluno}`);
                return true;
            }

            return false;
            
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async removerAluno(idAluno: number): Promise<boolean> {
        try {
            const queryDeleteAluno = `UPDATE Aluno SET situacao = FALSE WHERE id_aluno = $1;`

            const respostaBD = await database.query(queryDeleteAluno, [idAluno])

            if (respostaBD.rowCount != 0) {
                console.info(`Aluno removido com sucesso.`)
                return true;
            }

            return false;

        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

=======
class Aluno {
  private id_aluno: number;
  private ra: string;
  private nome: string;
  private sobrenome: string;
  private data_nascimento: Date;
  private endereco: string;
  private email: string;
  private celular: string;

  constructor(
    _id_aluno: number,
    _ra: string,
    _nome: string,
    _sobrenome: string,
    _data_nascimento: Date,
   _endereco: string,
    _email: string,
   _celular: string
  ) {
    this.id_aluno = _id_aluno;
    this.ra = _ra;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.data_nascimento = _data_nascimento;
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }

 public getIdAluno(): number {
    return this.id_aluno;
  }

  public getRa(): string {
    return this.ra;
  }

  public getNome(): string {
    return this.nome;
  }

  public getSobrenome(): string {
    return this.sobrenome;
  }

  public getNascimentoData(): Date {
    return this.data_nascimento;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCelular(): string {
    return this.celular;
  }

  public setIdAluno(id_aluno: number): void {
    this.id_aluno = id_aluno;
  }

  public setRa(ra: string): void {
    this.ra = ra;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setSobrenome(sobrenome: string): void {
    this.sobrenome = sobrenome;
  }

  public setNascimentoData(data_nascimento: Date): void {
    this.data_nascimento = data_nascimento;
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setCelular(celular: string): void {
    this.celular = celular;
  }
>>>>>>> d3192eb1373e6f36288a2e68d1e072685ade720a
}

export default Aluno;