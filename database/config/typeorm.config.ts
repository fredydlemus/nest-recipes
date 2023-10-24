import MainSeeder from "database/seeds/main.seeder";
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from 'typeorm-extension';

export const options = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['src/db/migrations', 'dist/src/migrations/*.js'],
  migrationsTableName: 'migrations',
  seeds: [MainSeeder]

};

export const source = new DataSource(options as DataSourceOptions & SeederOptions);