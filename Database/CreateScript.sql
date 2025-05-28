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

INSERT INTO tb_challenge(challenge_name)
VALUES ('Desafio Capkaton');

INSERT INTO tb_question(question_name, question_description, question_base_code, question_result)
VALUES('Questão 1','excrever enunciado','console.log("julio")','julio'),
('Questão 2','excrever enunciado','console.log("julio")','julio'),
('Questão 3','excrever enunciado','console.log("julio")','julio');

show tables;