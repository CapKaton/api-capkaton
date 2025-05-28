import { con } from "../Connection.js";

export async function getQuestion(challengeId) {
   const comando =
      `
        select 
            id,
            question_description,
            question_name 
         from 
            tb_question;
      `
   const [registro] = await con.query(comando);
   return registro;
}


export async function postQuestion(challengeId,groupId,questionId,questionAnswer,questionResult,timeSpent){
   const comando =
      `
         INSERT INTO tb_answer (challengeId,groupId,questionId,questionAnswer,questionResult,time_spent)
         VALUES(?,?,?,?,?,?);
      `
   const [registro] = await con.query(comando,[challengeId,groupId,questionId,questionAnswer,questionResult,timeSpent]);
   return registro;
}
