import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const options: Options<PostgreSqlDriver> = {
  entities: ["./dist/entities"], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: "./dist/migrations", // path to the folder with migrations
    pathTs: "./src/migrations", // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  seeder: {
    path: "dist/db/seeders",
    pathTs: "src/db/seeders",
  },
  type: "postgresql",
  allowGlobalContext: true,
};

export default options;
