import { con } from "../Connection.js";

export async function getQuestion(challengeId,groupId) {
   const comando =
      `
        SELECT 
            question.id,
            question.question_description as description,
            question.question_name as title,
            COUNT(answer.id) as quantidade_resposta
         FROM
            tb_question as question
         LEFT JOIN 
            tb_answer AS answer ON answer.id_question = question.id  and id_group = ?
         GROUP BY
            id,
            question.question_description,
            question.question_name 
         ;
      `
   const [registro] = await con.query(comando,[groupId]);
   return registro;
}


export async function postQuestion(challengeId,groupId,questionId,questionAnswer,questionResult,timeSpent){
   const comando =
      `
         INSERT INTO tb_answer (id_challenge,id_group,id_question,answer_code,answer_result,remaining_time)
         VALUES(?,?,?,?,?,?);
      `
   const [registro] = await con.query(comando,[challengeId,groupId,questionId,questionAnswer,questionResult,timeSpent]);
   return registro;
}
