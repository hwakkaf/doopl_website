const sqlite3 = require('sqlite3').verbose();
const { Client } = require('pg');
const dotenv = require('dotenv');

const migrate = async () => {
    await dotenv.config();
    await migrateSqliteToPG('.tmp/data.db', 'postgres://doopl:doopl2025@localhost:5432/doopl');
    console.log(process.env.DATABASE_FILENAME)
}

migrate()
/**
 * Migrates all tables and data from a SQLite database to PostgreSQL.
 * @param {string} sqliteFile - Path to the SQLite file.
 * @param {string} pgConnectionString - PostgreSQL connection string.
 */
/*
Assumptions:
    - Tables in sqlite db and posttgresql db are identical
function migrateSqliteToPG(sqlite file name, pg connection string)
    1. create connections to sqlite and postgresql
    2. get all tables in sqlite (user tables only)
    3. disable constraints & triggers on postgresql
    4. Truncate all table in PostgreSQL
    5. for each table t in sqlite database do:
        5.1 Get all rows from SQLite, in case of no rows continue to nexttable
        5.2 Prepare PostgreSQL insert statement
        5.3 for all data in t do:
            5.3.1 create Values array, converting sql linux time to pg timestamp
            5.3.2 execute insert
        5.4 Handle sequence for ID if exists:
            if there's t.id and in postgresql it has an autoincrement constraint using sequence, set the current value of the sequence to max(id)+1
    6.  Enable constraints & triggers on postgresql
    7. Close connections
*/
async function migrateSqliteToPG(sqliteFile, pgConnectionString) {
    // 1. Establish connections
    const sqliteDb = new sqlite3.Database(sqliteFile);
    const pgClient = new Client({ connectionString: pgConnectionString });
    await pgClient.connect();

    // Helper to run SQLite query and return a promise
    const sqliteAll = (sql) =>
        new Promise((resolve, reject) => {
            sqliteDb.all(sql, (err, rows) => (err ? reject(err) : resolve(rows)));
        });

    try {
        // 2. Get all tables from sqlite (user tables only)
        const tables = await sqliteAll(`
            SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
        `);
        // 3. disable constraints & triggers on postgresql
        await pgClient.query('SET session_replication_role = replica;');
        // 4. Truncate all table in PostgreSQL
        for (const { name: tableName } of tables) {
            await pgClient.query(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`);
        }

        // 5. for each table t in sqlite database do:
        for (const { name: tableName } of tables) {
            console.log(`Migrating table: ${tableName}`);
            // if (tableName.startsWith('up_') || tableName.startsWith('admin_')) {
            //     console.log("PR")
            // }
        
            // 5.1 Get all rows from SQLite
            const rows = await sqliteAll(`SELECT * FROM "${tableName}"`);
            if (rows.length === 0) continue;

            const columns = Object.keys(rows[0]);
            const colList = columns.map(col => `"${col}"`).join(', ');
            const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

            // 5.2 Prepare PostgreSQL insert statement
            const insertSQL = `INSERT INTO "${tableName}" (${colList}) VALUES (${placeholders})`;

            // 5.3 for all fecthed data do:
            for (const row of rows) {
                // 5.3.1 create Values array, converting sql linux time to pg timestamp
                const values = columns.map(c => {
                    const value = row[c];
                    
                    // Example: basic heuristic for timestamp values
                    if (typeof value === 'number' && value > 1e12) {
                        // Likely a millisecond timestamp
                        return new Date(value).toISOString();  // Converts to ISO string
                    }
                
                    return value;
                });
                // 5.3.2 Execute insert
                await pgClient.query(insertSQL, values);
            }

            // 5.4 Handle sequence for ID if exists
            //     if there's t.id and in postgresql it has an autoincrement constraint using sequence, set the current value of the sequence to max(id)+1
            if (columns.includes('id')) {
                const seqName = `${tableName}_id_seq`;
                const [{ max }] = await pgClient.query(`SELECT MAX(id) FROM "${tableName}"`)
                    .then(res => res.rows);
                const nextVal = (max || 0) + 1;

                try {
                    await pgClient.query(`SELECT setval('${seqName}', ${nextVal}, false)`);
                } catch (err) {
                    console.warn(`Warning: Couldn't update sequence for ${seqName}. ${err.message}`);
                }
            }
        }
        // 6.  Enable constraints & triggers on postgresql
        await pgClient.query('SET session_replication_role = DEFAULT;');
        console.log("Migration complete!");
    } catch (err) {
        console.error("Error during migration:", err);
    } finally {
        // 7. Close connections
        sqliteDb.close();
        await pgClient.end();
    }
}