import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'bookstore',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/config/database/migrations/*.js'],
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
