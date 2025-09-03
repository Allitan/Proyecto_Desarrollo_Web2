
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

async function initializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })

  try {
    const client = await pool.connect()
    
    // Leer y ejecutar el archivo SQL
    const sqlPath = path.join(__dirname, 'init-db.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    
    await client.query(sql)
    console.log('Base de datos inicializada exitosamente')
    
    client.release()
  } catch (error) {
    console.error('Error inicializando la base de datos:', error)
  } finally {
    await pool.end()
  }
}

initializeDatabase()