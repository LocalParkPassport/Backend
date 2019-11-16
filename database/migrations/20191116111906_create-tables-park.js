
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 255)
                .notNullable()
                .unique();
            tbl.string('password')
                .notNullable();
        })
        .createTable('parks', tbl => {
            tbl.increments();
            tbl.string('name', 255)
                .notNullable()
                .unique();
            tbl.string('location', 255)
                .notNullable();
            tbl.text('description')
                .notNullable();
            tbl.boolean('dog park')
                .defaultTo(0);
            tbl.boolean('wildlife')
                .defaultTo(0);
            tbl.boolean('hiking trails')
                .defaultTo(0);
            tbl.boolean('disc golf')
                .defaultTo(0);
            tbl.boolean('open spaces')
                .defaultTo(0);
            tbl.boolean('climbing trees')
                .defaultTo(0);
            tbl.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('SET NULL');
        })
        .createTable('ratings', tbl => {
            tbl.increments();
            tbl.integer('rating')
                .unsigned();
            tbl.text('comments');
            tbl.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('park_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('parks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('ratings')
        .dropTableIfExists('parks')
        .dropTableIfExists('users')
};
