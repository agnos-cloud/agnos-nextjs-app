export default `
type Form = Record<string, any>;

interface Func {
    _id: String;
    name: String;
    secrets?: Record<string, any>;
    team: Team;
    version: FunctionVersion;
}

interface FunctionVersion {
    _id: String;
    name: String;
    scopes?: Array<PermissionScope>;
    secrets?: Record<string, any>;
}

enum PermissionScope {
    "read:design" = "read:design",
    "read:environment" = "read:environment",
    "read:org" = "read:org",
    "read:project" = "read:project",
    "read:user" = "read:user",
}

interface Team {
    _id: String;
    name: String;
}

interface User {
    email?: String;
    name: String;
    picture?: String;
}

declare class Agnos {
    form: Form;
    function: Func;
    secrets?: Record<string, any>;
    user?: User;
}

declare const agnos: Agnos;
`;
