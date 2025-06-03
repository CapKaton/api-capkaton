import { con } from "../Connection.js";

export async function getLenguages() {
   const comando =
      `
        select 
            language_name, 
            code_base 
         from 
            tb_language;
      `
   const [registro] = await con.query(comando);
   return registro;
}
