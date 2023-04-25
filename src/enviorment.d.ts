declare global {
    namespace NodeJS {
        interface ProcessEnv {
            discordToken: string;
            clientId: string;
            NODE_ENV: "dev" | "prod" | "debug";
            enableDalai: boolean;
            DATABASE_URL: string;
        }
    }
}

export { };