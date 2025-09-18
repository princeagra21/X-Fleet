import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  primary: {
    host: process.env.PRIMARY_DB_HOST || 'localhost',
    port: parseInt(process.env.PRIMARY_DB_PORT || '5432', 10),
    username: process.env.PRIMARY_DB_USER || 'postgres',
    password: process.env.PRIMARY_DB_PASSWORD || 'password',
    database: process.env.PRIMARY_DB_NAME || 'primary_db',
    url: `postgresql://${process.env.PRIMARY_DB_USER || 'postgres'}:${process.env.PRIMARY_DB_PASSWORD || 'password'}@${process.env.PRIMARY_DB_HOST || 'localhost'}:${process.env.PRIMARY_DB_PORT || '5432'}/${process.env.PRIMARY_DB_NAME || 'primary_db'}`
  },
  logs: {
    host: process.env.LOGS_DB_HOST || 'localhost',
    port: parseInt(process.env.LOGS_DB_PORT || '5432', 10),
    username: process.env.LOGS_DB_USER || 'postgres',
    password: process.env.LOGS_DB_PASSWORD || 'password',
    database: process.env.LOGS_DB_NAME || 'logs_db',
    url: process.env.LOGS_DATABASE_URL || `postgresql://${process.env.LOGS_DB_USER || 'postgres'}:${process.env.LOGS_DB_PASSWORD || 'password'}@${process.env.LOGS_DB_HOST || 'localhost'}:${process.env.LOGS_DB_PORT || '5432'}/${process.env.LOGS_DB_NAME || 'logs_db'}`
  },
  address: {
    host: process.env.ADDRESS_DB_HOST || 'localhost',
    port: parseInt(process.env.ADDRESS_DB_PORT || '5432', 10),
    username: process.env.ADDRESS_DB_USER || 'postgres',
    password: process.env.ADDRESS_DB_PASSWORD || 'password',
    database: process.env.ADDRESS_DB_NAME || 'address_db',
    url: process.env.ADDRESS_DATABASE_URL || `postgresql://${process.env.ADDRESS_DB_USER || 'postgres'}:${process.env.ADDRESS_DB_PASSWORD || 'password'}@${process.env.ADDRESS_DB_HOST || 'localhost'}:${process.env.ADDRESS_DB_PORT || '5432'}/${process.env.ADDRESS_DB_NAME || 'address_db'}`
  }
}));