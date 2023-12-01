"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_typescript_migration_lts_1 = require("sequelize-typescript-migration-lts");
const db_postgres_config_1 = require("./src/infrastructure/database/postgres/db-postgres.config");
dotenv_1.default.config();
const sequelize = new db_postgres_config_1.PostgresDbConfig();
const bootstrap = async () => {
    try {
        const result = await sequelize_typescript_migration_lts_1.SequelizeTypescriptMigration.makeMigration(sequelize.sequelize, {
            outDir: (0, path_1.join)(__dirname, "./db/migrations"),
            migrationName: "init-migrations",
            debug: true,
            preview: false,
        });
        console.log("result: ", result.msg);
    }
    catch (e) {
        console.log("error: ", e);
    }
};
bootstrap();
