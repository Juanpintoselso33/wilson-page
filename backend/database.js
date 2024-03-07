import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

// Descomponer la URL de conexión de la base de datos
const dbUrl = new URL(process.env.SUPABASE_URL)

const sequelize = new Sequelize(
  dbUrl.pathname.substr(1),
  dbUrl.username,
  dbUrl.password,
  {
    host: dbUrl.hostname,
    port: dbUrl.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necesario para evitar problemas con certificados en Supabase
      }
    }
  }
)

// Testear la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito.')
  })
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err)
  })

export default sequelize
