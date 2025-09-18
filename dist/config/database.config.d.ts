export declare const databaseConfig: (() => {
    primary: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string;
        url: string | undefined;
    };
    logs: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string;
        url: string | undefined;
    };
    address: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string;
        url: string | undefined;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    primary: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string;
        url: string | undefined;
    };
    logs: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string;
        url: string | undefined;
    };
    address: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string;
        url: string | undefined;
    };
}>;
