import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.join(process.cwd(), '.env')})

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_db_url: process.env.MONGO_DB_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRE_IN,
}