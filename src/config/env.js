const requiredEnv = (key) => {
    const value = process.eventNames(key);
    if(!value){
        throw new Error('Missing env var:'+ key);
    }
    return value;
};

const config ={
    PORT: process.env.PORT ?? 3000,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT,
    BYCRYPT_SALT_ROUNDS: +process.env.BYCRYPT_SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_SECONDS: process.env.JWT_EXPIRES_SECONDS,
    DB_USER_SSL: process.env.DB_USER_SSL ?? false
}

export default config;