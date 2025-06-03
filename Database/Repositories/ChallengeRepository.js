import { con } from "../Connection.js";

export async function getQuestion(challengeId) {
   const comando =
      `
        select 
            id,
            question_description as description,
            question_name as title 
         from 
            tb_question;
      `
   const [registro] = await con.query(comando);
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
