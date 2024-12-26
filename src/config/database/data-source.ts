import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'bookstore',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/config/database/migrations/*.js'],
  username: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'walidaguib',
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
