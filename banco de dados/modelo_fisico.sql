CREATE SCHEMA IF NOT EXISTS fortificar DEFAULT CHARACTER SET utf8mb4;
USE fortificar;

CREATE TABLE IF NOT EXISTS usuarios_ongs (
email VARCHAR(40) PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
senha VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios_fortificar (
email VARCHAR(40) PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
senha VARCHAR(20) NOT NULL,
id_fucionario VARCHAR(45) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS projetos (
id INT PRIMARY KEY,
descricao VARCHAR(200) NOT NULL,
data_abertura DATE NOT NULL,
nome VARCHAR(100) NOT NULL,
email_usuario_ong VARCHAR(40) NOT NULL,
email_usuario_fortificar VARCHAR(40) NOT NULL,
CONSTRAINT email_usuario_ong_projetos FOREIGN KEY(email_usuario_ong)  REFERENCES usuarios_ongs(email),
CONSTRAINT email_usuario_fortificar_projetos FOREIGN KEY(email_usuario_fortificar) REFERENCES usuarios_fortificar(email)
);

CREATE TABLE IF NOT EXISTS solicitacoes (
id INT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(200) NOT NULL, 
status_ VARCHAR(45) NOT NULL,
prioridade ENUM("baixa", "alta", "média") NOT NULL,
data_abertura DATE NOT NULL,
categoria VARCHAR(45) NOT NULL,
id_projeto INT NOT NULL,
CONSTRAINT id_projeto_solicitacoes FOREIGN KEY(id_projeto) REFERENCES projetos(id)
);


CREATE TABLE IF NOT EXISTS requisicoes (
id INT PRIMARY KEY,
descricao VARCHAR(200),
status_ VARCHAR(45),
data_abertura DATE NOT NULL,
id_solicitacao INT NOT NULL,
CONSTRAINT id_solicitacao_resqusicao FOREIGN KEY(id_solicitacao) REFERENCES solicitacoes(id)
);

CREATE TABLE IF NOT EXISTS documentos (
id INT PRIMARY KEY,
arquivo MEDIUMBLOB NOT NULL,
data_envio DATE NOT NULL,
id_projeto INT NOT NULL,
id_requisicao INT NOT NULL,
CONSTRAINT id_projeto_documentos FOREIGN KEY(id_projeto) REFERENCES projetos(id),
CONSTRAINT id_requisicao_documentos FOREIGN KEY(id_requisicao) REFERENCES requisicoes(id) 
);

CREATE TABLE IF NOT EXISTS agendamentos (
data_ DATE NOT NULL,
hora TIME NOT NULL,
descricao VARCHAR(100) NOT NULL,
id_solicitacao INT NOT NULL,
CONSTRAINT id_solicitacao_agendamentos FOREIGN KEY(id_solicitacao) REFERENCES solicitacoes(id)
);


CREATE TABLE IF NOT EXISTS caixa(
ano YEAR PRIMARY KEY,
orcamento_anual DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS transacoes (
id INT PRIMARY KEY,
data_hora DATETIME NOT NULL,
detalhamento VARCHAR(100) NOT NULL,
valor DECIMAL(10,2) NOT NULL,
ano_caixa YEAR NOT NULL,
id_solicitacao INT NOT NULL,
CONSTRAINT ano_caixa_transacoes FOREIGN KEY(ano_caixa) REFERENCES caixa(ano),
CONSTRAINT id_solicitacao_transacoes FOREIGN KEY(id_solicitacao) REFERENCES solicitacoes(id)
);
