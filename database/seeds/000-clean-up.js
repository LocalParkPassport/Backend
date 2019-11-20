const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
    return knex('ratings').truncate()
        .then(() => {
            return knex('parks').truncate()
                .then(() => {
                    return knex('users').truncate()
                        .then(() => {
                            return cleaner.clean(knex, {
                                mode: 'truncate',
                                restartIdentity: true, // Used to tell PostgresSQL to reset the ID counter
                                ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
                            })
                        });
                });
        });
};