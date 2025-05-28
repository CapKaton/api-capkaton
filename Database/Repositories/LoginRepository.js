import { con } from "../Connection.js";

export async function createGroup(groupName, playerOne, playerTwo) {

   const comando =
      `
        INSERT INTO tb_group (group_name, player_one, player_two)
        VALUES (?,?,?);
   `
   const [registro] = await con.query(comando, [groupName, playerOne, playerTwo]);
   return registro.insertId;
}

