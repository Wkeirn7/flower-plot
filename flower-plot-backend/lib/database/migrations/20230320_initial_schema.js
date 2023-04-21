exports.up = (knex) => {
    return knex.schema
    .createTable('plot_user', (table) => {
      table.increments('id').primary()
      table.string('username', 50)
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .createTable('plot', (table) => {
      table.increments('id').primary()
      table.string('title', 50)
      
      table
        .integer('plot_user_id')
        .references('id')
        .inTable('plot_user')
        .onDelete('SET NULL')
        .index()

      table.string('unit_of_measurement')
      table.integer('length')
      table.integer('width')
    })
    .createTable('category', (table) => {
      table.increments('id').primary()
      table.string('category_name')
    })
    .createTable('water_requirements', (table) => {
      table.increments('id').primary()
      table.string('value')
    })
    .createTable('sun_requirements', (table) => {
      table.increments('id').primary()
      table.string('value')
    })
    .createTable('plant', (table) => {
      table.increments('id').primary()
      table.boolean('is_custom').defaultTo('FALSE')
      
      table
      .integer('plot_user_id')
      .references('id')
      .inTable('plot_user')
      .onDelete('SET NULL')
      .index()
      
      table
      .integer('category_id')
      .references('id')
      .inTable('category')
      .onDelete('SET NULL')
      .index()
      
      table
      .integer('water_requirements_id')
      .references('id')
      .inTable('water_requirements')
      .onDelete('SET NULL')
      .index()
      
      table
      .integer('sun_requirements_id')
      .references('id')
      .inTable('sun_requirements')
      .onDelete('SET NULL')
      .index()
      
      table.string('name', 50)
      table.string('image_url')
      table.string('description', 500)
      table.string('planting_time')
      table.integer('days_to_harvest')
      table.integer('inches_between_plantings')
      table.string('annual_perennial')
    })
    .createTable('plot_plant', (table) => {
      table.increments('id').primary()

      table
        .integer('plot_id')
        .references('id')
        .inTable('plot')
        .onDelete('CASCADE')
        .index()

      table
      .integer('plant_id')
      .references('id')
      .inTable('plant')
      .onDelete('CASCADE')
      .index()

      table.integer('length')
      table.integer('width')
      table.integer('top_left_x_value')
      table.integer('top_left_y_value')
    })
  }
  
  exports.down = (knex) => {
    return knex.schema
      .dropTableIfExists('plot_user')
      .dropTableIfExists('category')
      .dropTableIfExists('water_requirements')
      .dropTableIfExists('sun_requirements')
      .dropTableIfExists('plant')
      .dropTableIfExists('plot')
      .dropTableIfExists('plot_plant')
  }
