const baseConfig = {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
    useNullAsDefault: true,
};

module.exports = {
  development: baseConfig,
  staging: {},
  production: {
    ...baseConfig,
    connection: {
      filename: "/data/db.sqlite",
    },
  },
};
