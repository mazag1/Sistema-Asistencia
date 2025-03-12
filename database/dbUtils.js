import db from './db.js';

export const crudUtils = {
    /**
     * Función dinámica para INSERT
     * @param {string} table - Nombre de la tabla
     * @param {object} data - Objeto de data (ej. { nombre: 'Juan', email: 'test@example.com' })
     */
    async  insert (table, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');

        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        const [result] = await db.execute(query, values);
        return result;
    },

    /**
     * Función dinámica para SELECT
     * @param {string} table - Nombre de la tabla
     * @param {object} conditions - Objeto de condiciones (ej. { nombre: 'Juan', email: 'test@example.com' })
     */
    async select (table, conditions = {}) {
        let query = `SELECT * FROM ${table}`;
        const values = [];

        if (Object.keys(conditions).length > 0) {
            const whereClauses = Object.keys(conditions).map((key) => {
                values.push(conditions[key]);
                return `${key} = ?`;
            });
            query += ` WHERE ${whereClauses.join(' AND ')}`;
        }
        const [rows] = await db.execute(query, values);
        return rows;
    },

    /**
     * Función dinámica para UPDATE
     * @param {string} table - Nombre de la tabla
     * @param {object} data - Objeto de data (ej. { nombre: 'Juan', email: 'test@example.com' })
     * @param {object} conditions - Objeto de condiciones (ej. { nombre: 'Juan', email: 'test@example.com' })
     */
    async update (table, data, conditions) {
        const setClauses = Object.keys(data).map((key) => `${key} = ?`).join(', ');
        const values = Object.values(data);

        const whereClauses = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
        const whereValues = Object.values(conditions);

        const query = `UPDATE ${table} SET ${setClauses} WHERE ${whereClauses}`;
        const [result] = await db.execute(query, [...values, ...whereValues]);
        return result;
    },

    /**
     * Función Dinámica para Ingresar un Query
     * @param {string} sql - Query SQL 
     */
    async query(sql, params = []) {
        const [rows] = await db.execute(sql, params);
        return rows;
    }
};
  
