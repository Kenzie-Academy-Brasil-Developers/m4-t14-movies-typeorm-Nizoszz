import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const entititesPath = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationsPath = path.join(__dirname, "./migrations/**.{ts,js}");

  const dbUrl: string | undefined = process.env.DB_URL;
  if (!dbUrl) {
    throw new Error("Env var DB_URL does not exists");
  }

  const nodeEnv: string | undefined = process.env.NODE_ENV;
  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entititesPath],
    };
  }

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath],
    entities: [entititesPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };
