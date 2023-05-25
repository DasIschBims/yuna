declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            DISCORD_CLIENT_ID: string;
            NODE_ENV: "dev" | "prod" | "debug";
            DATABASE_URL: string;
        }
    }
}

export { };