import { con } from "../Connection.js";

export async function getResultByGroup(groupId) {

   const comando =
      `
         SELECT 
            tb_question.id,
            tb_question.question_name,
            tb_question.question_description,
            tb_question.question_result,
            tb_answer.answer_result,
            tb_answer.remaining_time
         FROM 
            tb_answer
            INNER JOIN tb_question on tb_question.id = tb_answer.id_question
         WHERE 
            id_group = ?
   `
   const [result] = await con.query(comando, [groupId]);
   return result;
}

