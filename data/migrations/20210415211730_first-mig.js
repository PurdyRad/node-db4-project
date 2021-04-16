
exports.up = function(knex) {
    return knex.schema
    .createTable('recipes', tbl => {
        tbl.increments('recipe_id');
        tbl.string('recipe_name', 128).notNullable();
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('ingredients', tbl => {
        tbl.increments('ingredient_id');
        tbl.string('ingredient_name', 128).notNullable().unique();
    })
    .createTable('steps', tbl => {
        tbl.increments('step_id');
        tbl.string('step_instruction', 128).notNullable();
        tbl.integer('step_number', 30).notNullable().unique();
        tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('cascade');
    })
    .createTable('steps_ingr', tbl => {
        tbl.increments('steps_ingr_id');
        tbl.integer('measurement', 30);
        tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('cascade');
        tbl.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onDelete('cascade');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('steps_ingr')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
