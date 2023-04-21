const migrationService = async(): Promise<void> => {
    const knex = require('knex')({
        production: {
            client: "postgresql",
            connection: {
              "host": "flower-plot-dev.cw59i5znjlqp.us-east-1.rds.amazonaws.com",
              "user": "wkeirn7",
              "port": 5432,
              "ssl": false,
              "database": "postgres",
              "password": "Martialarts1!10566391"
            },
            pool: {
              min: 2,
              max: 10
            },
          }
    });
    
    const migrationConfig = {
        directory: __dirname + '../lib/database/migrations',
    }
    
    console.info('Running migrations in: ' + migrationConfig.directory);
    
    const migrationReturn = await knex.migrate.latest(migrationConfig)
    const [log, batchNo] = migrationReturn;
        if (!log.length) {
            console.info('Database is already up to date');
        } else {
            console.info('Ran migrations: ' + log.join(', '));
            console.log('Batch no:' + batchNo)
        }
    
    // Important to destroy the database, otherwise Node script won't exit
    // because Knex keeps open handles.
    knex.destroy();
}
