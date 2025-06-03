CREATE DATABASE CAPKATON;
USE CAPKATON;

CREATE TABLE tb_group (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(50),
    player_one VARCHAR(50),
    player_two VARCHAR(50)
);

CREATE TABLE tb_challenge (
    id INT PRIMARY KEY AUTO_INCREMENT,
    challenge_name VARCHAR(50)
);

CREATE TABLE tb_question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_name VARCHAR(50),
    question_description VARCHAR(500),
    question_base_code VARCHAR(500),
    question_result VARCHAR(255)
);

CREATE TABLE tb_answer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    answer_code VARCHAR(500),
    answer_result VARCHAR(255),
    remaining_time TIME,
    id_group INT,
    id_challenge INT,
    id_question INT,
    FOREIGN KEY (id_group) REFERENCES tb_group(id),
    FOREIGN KEY (id_challenge) REFERENCES tb_challenge(id),
    FOREIGN KEY (id_question) REFERENCES tb_question(id)
);

CREATE TABLE tb_language(
	id INT PRIMARY KEY AUTO_INCREMENT,
    language_name VARCHAR(50),
    code_base TEXT
);

INSERT INTO tb_challenge(challenge_name)
VALUES ('Desafio Capkaton');

INSERT INTO tb_language(language_name,code_base)
VALUES
('javascript', 'function Template(a, b) {\n  // implemente aqui\n  console.log( a+","+ b);\n}\nTemplate(10, 5);'),

('python', 'const codigo = "def Template(a, b):\n    # implemente aqui\n    print(a + \",\" + b)\n\nTemplate(10, 5)";'),

('java', 'public class Main {\n  public static int template(int a, int b) {\n    System.out.println(a + \", \" + b);\n    return a + b;\n  }\n\n  public static void main(String[] args) {\n    int resultado = template(10, 5);\n    System.out.println(\"Resultado: \" + resultado);\n  }\n}');
INSERT INTO tb_question(question_name, question_description, question_base_code, question_result)
VALUES('Questão 1','excrever enunciado','console.log("julio")','julio'),
('Questão 2','excrever enunciado','console.log("julio")','julio'),
('Questão 3','excrever enunciado','console.log("julio")','julio');

show tables;