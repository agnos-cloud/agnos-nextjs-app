export default `
declare class Console {
    error(data: any);
    info(data: any);
    log(data: any);
    success(data: any);
    warn(data: any);
}

declare const console: Console;
`;
