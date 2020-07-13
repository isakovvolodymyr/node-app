require("dotenv").config();
module.exports = {
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    database: process.env.MONGO_INITDB_DATABASE,
    // url: process.env.MYSQL_URL,
    migrations: ["src/migration/*.ts"],
    cli: {
        "migrationsDir": "src/migration"
    },
    migrationsRun: true,
    logging: true,
    synchronize: false,
    entities: ["src/**/**/model/*.ts"]
};
//# sourceMappingURL=ormconfig.js.map