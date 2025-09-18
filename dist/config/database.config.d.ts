export declare const databaseConfig: (() => {
    primary: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        url: string;
    };
    logs: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        url: string;
    };
    address: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        url: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    primary: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        url: string;
    };
    logs: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        url: string;
    };
    address: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        url: string;
    };
}>;
