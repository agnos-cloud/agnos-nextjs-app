export default `
type EnvType = "production" | "test";

interface Env {
    NODE_ENV: EnvType;
}

declare class Process {
    env: Env;
}

declare const process: Process;
`;
