import { knex } from "knex";

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./src/database/poo-exercicios.db", //* Localização do seu arquivo .db
  },
  useNullAsDefault: true, //* Definirá NULL quando encontrar valores undefined
  pool: {
    min: 0, //* Número de conexões, esses valores são os recomendados para sqlite3
    max: 1,
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    }, //* Configurando para o knex forçar o check das constrainst FK
  },
});
