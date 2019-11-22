
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
            tbl.boolean('restrooms')
                .defaultTo(false);
            tbl.boolean('fishing')
                .defaultTo(false);
            tbl.boolean('camping')
                .defaultTo(false);
            tbl.boolean('tennis')
                .defaultTo(false);
            tbl.boolean('basketball')
                .defaultTo(false);
            tbl.boolean('golf')
                .defaultTo(false);
            tbl.boolean('dogPark')
                .defaultTo(false);
            tbl.text('img');
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
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
