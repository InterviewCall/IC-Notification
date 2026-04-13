import dotenv from 'dotenv';

dotenv.config();

type ServerConfig = {
    PORT: number
    SALT :number
    JWT_SECRET : string
    JWT_EXPIRES_IN : string
}

type DBConfig = {
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
}

export const dbConfig: DBConfig = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'Ujjwal000',
    DB_NAME: process.env.DB_NAME || 'icuserdb'
};

export const serverConfig: ServerConfig =  {
    PORT: Number(process.env.PORT) || 5002,
    SALT: Number(process.env.SALT),
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) 
};