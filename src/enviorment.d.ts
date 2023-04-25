declare global {
    namespace NodeJS {
        interface ProcessEnv {
            discordToken: string;
            clientId: string;
            NODE_ENV: "dev" | "prod" | "debug";
            enableDalai: boolean;
            dbHost: string;
            dbUser: string;
            dbPassword: string;
            dbName: string;
        }
    }
}

export { };