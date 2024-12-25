import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/config/database/migrations/*.js'],
  username: 'postgres',
  host: 'database',
  port: 5432,
  password: 'postgres',
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
