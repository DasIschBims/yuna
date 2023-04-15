declare global {
    namespace NodeJS {
        interface ProcessEnv {
            discordToken: string;
            clientId: string;
            NODE_ENV: "dev" | "prod" | "debug";
            huggingFaceKey: string;
        }
    }
}

export { };