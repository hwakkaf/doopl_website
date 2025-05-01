import { Client } from 'pg';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Main migration function
export async function migratePostgresToSqlite(pgConnectionString, sqliteFile) {
    const pgClient = new Client({ connectionString: pgConnectionString });
    await pgClient.connect();

    const sqliteDb = await open({
        filename: sqliteFile,
        driver: sqlite3.Database,
    });

    try {
        // 1. Get all user-defined tables in PostgreSQL (excluding system tables)
        const { rows: pgTables } = await pgClient.query(`
            SELECT tablename FROM pg_tables
            WHERE schemaname = 'public'
        `);

        for (const { tablename } of pgTables) {
            console.log(`Migrating table: ${tablename}`);

            // 2.1 Truncate table in SQLite
            await sqliteDb.run(`DELETE FROM "${tablename}"`);

            // 2.2 Get all rows from PostgreSQL
            const { rows: pgRows } = await pgClient.query(`SELECT * FROM "${tablename}"`);
            if (pgRows.length === 0) continue;

            const columns = Object.keys(pgRows[0]);
            const colList = columns.map(c => `"${c}"`).join(', ');
            const placeholders = columns.map(() => '?').join(', ');
            const insertSQL = `INSERT INTO "${tablename}" (${colList}) VALUES (${placeholders})`;

            for (const row of pgRows) {
                const values = columns.map(col => {
                    const val = row[col];
                    // Convert timestamps to ISO string for SQLite compatibility
                    if (val instanceof Date) return val.toISOString();
                    return val;
                });

                await sqliteDb.run(insertSQL, values);
            }

            // 2.3 Update SQLite sequence for autoincrement `id` if exists
            if (columns.includes('id')) {
                const [{ 'MAX(id)': maxId }] = await sqliteDb.all(`SELECT MAX(id) FROM "${tablename}"`);
                if (typeof maxId === 'number') {
                    await sqliteDb.run(`UPDATE sqlite_sequence SET seq = ? WHERE name = ?`, [maxId, tablename]);
                }
            }
        }

        console.log("Migration complete!");
    } catch (err) {
        console.error("Error during migration:", err);
    } finally {
        await pgClient.end();
        await sqliteDb.close();
    }
}

// Example usage:
// migratePostgresToSqlite('postgres://user:pass@localhost:5432/mydb', './mydb.sqlite');
