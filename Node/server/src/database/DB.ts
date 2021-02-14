import { Pool, QueryResult } from "pg";

const connect = async () => {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'dbTeste',
      password: 'senhaPG',
      port: 5432,
    });
 
    // test connection
    // const client = await pool.connect();
    // console.log("Criou pool de conexões no PostgreSQL!");
 
    // const res = await client.query('SELECT NOW()');
    // console.log(res.rows[0]);
    // client.release();
 
    return pool.connect();
}

const query = async (queryText: string, params?: any[]) => {
  const client = await connect();
  const res: QueryResult<any> = await client.query(queryText, params)
    .then(res => res)
    .catch(err => err.stack)
    .finally(() => client.release());

  return res;
}

export default query;
