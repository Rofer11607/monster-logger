export declare class TopLevelLogger<T> {
    private currentGroups;
    private isVerbose;
    constructor(currentGroups: Array<T>, isVerbose?: boolean);
    defineTriggers(trigger: Array<T>, config?: Partial<loggerOptions>): Logger<T>;
}
declare type logLevel = "success" | "info" | "error" | "warning";
interface loggerOptions {
    label: string;
    what: any;
    level: logLevel;
    type: "table" | "trace" | "log";
}
declare class Logger<T> {
    private currentGroups;
    private trigger;
    private isVerbose;
    private config?;
    constructor(currentGroups: Array<T>, trigger: Array<T>, isVerbose: boolean, config?: Partial<loggerOptions> | undefined);
    log(opt?: Partial<loggerOptions>): void;
}
export {};
