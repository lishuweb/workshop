const { Sequelize } = require("sequelize");
const { DB_CONNECTION } = require("./config");
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DB_CONNECTION, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const migrationConf = {
  migrations: {
    glob: 'migration/*.js',
  },
  storage: new SequelizeStorage({sequelize, tableNme: 'migration'}),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const rollbackMigration = async() => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
};

const connectToDatabase = async () => {
  try 
  {
    await sequelize.authenticate();
    await runMigrations();
    console.log('connected to the database');
  } 
  catch (err) 
  {
    console.log('failed to connect to the database');
    console.log(err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };