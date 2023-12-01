import { join } from "path";
import dotenv from "dotenv";

import { SequelizeTypescriptMigration } from "sequelize-typescript-migration-lts";
import { PostgresDbConfig } from "./src/infrastructure/database/postgres/db-postgres.config";

dotenv.config();


const sequelize = new PostgresDbConfig();
const bootstrap = async () => {
  
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize.sequelize, {
      outDir: join(__dirname, "./db/migrations"),
      migrationName: "init-migrations",
      debug: true,
      preview: false,
    });
    console.log("result: ", result.msg);
  } catch (e) {
    console.log("error: ", e);
  }
};

bootstrap();
