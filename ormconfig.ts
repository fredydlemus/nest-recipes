import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['src/db/migrations', 'dist/src/migrations/*.js']
});