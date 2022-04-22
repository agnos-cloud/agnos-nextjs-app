export default `
type Form = Record<string, any>;

interface Func {
    name: String;
    version: FunctionVersion;
}

interface FunctionVersion {
    name: String;
    secrets?: Record<string, any>;
}

interface User {
    email?: String;
    name: String;
    picture?: String;
}

declare class Agnos {
    form: Form;
    function: Func;
    user: User;
}

declare const agnos: Agnos;
`;
