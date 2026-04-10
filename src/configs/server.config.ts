import dotenv from 'dotenv';

dotenv.config();

type ServerConfig = {
    PORT: number
    SALT :number
    JWT_SECRET : string
    JWT_EXPRIRES_IN : string
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
    DB_PASSWORD: process.env.DB_PASSWORD || '1748arijiT#',
    DB_NAME: process.env.DB_NAME || 'ic_notification'
};

export const serverConfig: ServerConfig =  {
    PORT: Number(process.env.PORT) || 3000,
    SALT: Number(process.env.SALT),
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPRIRES_IN: String(process.env.JWT_EXPRIRES_IN) 
};