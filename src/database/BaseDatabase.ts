import { knex } from "knex";

//* Criar uma classe abstrata e implementar método para realizar conexão com banco de dados para o app;

//* INSTANCIAR abstract class - Não é possível instanciar abstract class;

//* const bancoDeDados = new BaseDatabase()

export abstract class BaseDatabase {
  protected static conection = knex({
    client: "sqlite3",
    connection: {
      filename: "./src/database/poo-exercicios.db",
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
}
