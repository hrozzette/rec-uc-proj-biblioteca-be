CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');


INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) VALUES
('Carla', 'Peixoto', '2007-05-20', 'Rua Doutor Euclides, 992', 'carla_peixoto@mabeitex.com.br', '1698606752'),
('Ruan Kevin Iago', 'Pereira', '1998-07-12', 'Rua São Benedito, 948', 'ruan.kevin.pereira@balaiofilmes.com.br', '16996496296'),
('Thiago Otávio', 'Santos', '1985-04-25', 'Rua Viela Dez, 505', 'thiagootaviosantos@salvagninigroup.com', '16996450592'),
('Isabel Isabelly', 'da Cunha', '1990-04-13', 'Rua Sebastião Gonçalves do Nascimento, 997', 'isabel_dacunha@geopx.com.br', '16988514483'),
('Alexandre Eduardo', 'da Mata', '2001-09-22', 'Rua Luís Edmundo, 693', 'alexandre_eduardo_damata@zigotto.com.br', '16985176694'),
('Marcos Vinicius Daniel, Leonardo', 'Rodrigues', '1999-10-03', 'Rua Rafael Chiarioni Alfano, 633', 'marcos-rodrigues71@publicarbrasil.com.br', '16981954756'),
('Renan César', 'Moraes', '1994-06-25', 'Rua Maria do Céu Correia, 787', 'renan-moraes78@ramiresmotors.com.br', '16981219126'),
('Elias Geraldo', 'Brito', '2006-02-26', 'Rua Cacimba, 391', 'elias_geraldo_brito@globomail.com', '16997011338'),
('Alice Bárbara', 'Barbosa', '1975-02-18' , 'Rua Vergílio Pavan, 528', 'alice.barbara.barbosa@acaoi.com.br', '16988438010'),
('Levi Lucca', 'Aparício', '1980-02-09', 'Rua Estrada José da Silva Júnior, 247', 'levi_aparicio@kantoferramentaria.com.br', '16991377417');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');


INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
VALUES
('É Assim que Acaba', 'Colleen Hoover', 'Galera Record', '2016', '978-8501112514', 10, 10, 85.00, 'Disponível'),
('Verity', 'Colleen Hoover', 'Galera Record', '2018', '978-8501118554', 8, 8, 90.00, 'Disponível'),
('A Cinco Passos de Você', 'Rachael Lippincott', 'Globo Alt', '2019', '978-8525067421', 7, 7, 70.00, 'Disponível'),
('Os Sete Maridos de Evelyn Hugo', 'Taylor Jenkins Reid', 'Paralela', '2017', '978-8551002933', 9, 9, 95.00, 'Disponível'),
('Malibu Renasce', 'Taylor Jenkins Reid', 'Paralela', '2021', '978-6559810387', 6, 6, 100.00, 'Disponível'),
('A Paciente Silenciosa', 'Alex Michaelides', 'Record', '2019', '978-8501116543', 8, 8, 85.00, 'Disponível'),
('Antes Que o Café Esfrie', 'Toshikazu Kawaguchi', 'Valentina', '2020', '978-8554421748', 6, 6, 80.00, 'Disponível'),
('A Biblioteca da Meia-Noite', 'Matt Haig', 'Bertrand Brasil', '2021', '978-6558380317', 7, 7, 90.00, 'Disponível'),
('Teto Para Dois', 'Beth O’Leary', 'Intrínseca', '2019', '978-8551005415', 5, 5, 75.00, 'Disponível'),
('Tudo é Rio', 'Carla Madeira', 'Record', '2014', '978-8501119599', 4, 4, 70.00, 'Disponível');


-- Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
VALUES
(15, 11, '2025-01-10', '2025-02-10', 'Em andamento'), 
(13, 17, '2025-02-09', '2025-03-09', 'Em andamento'),   
(19, 13, '2025-03-08', '2025-04-08', 'Em andamento'),   
(11, 20, '2025-04-07', '2025-05-07', 'Em andamento'),  
(18, 14, '2025-05-06', '2025-06-06', 'Em andamento'),   
(20, 12, '2025-06-05', '2025-07-05', 'Em andamento'),  
(16, 15, '2025-07-04', '2025-08-04', 'Em andamento'),  
(17, 18, '2025-08-03', '2025-09-03', 'Em andamento'),   
(12, 16, '2025-09-02', '2025-10-02', 'Em andamento'),   
(14, 19, '2025-10-01', '2025-11-01', 'Em andamento');   