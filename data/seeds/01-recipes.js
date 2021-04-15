
exports.seed = async function(knex) {
  await knex('recipes').insert([
    {recipe_name: 'Grilled Cheese'},
    {recipe_name: 'Instant Rice'}
  ])
  await knex('ingredients').insert([
    {ingredient_name: 'Cheese'},
    {ingredient_name: 'Rice'}
  ])
  await knex('steps').insert([
    {step_instruction: 'Heat a skillet over medium-high heat', step_number: 1, recipe_id: 1},
    {step_instruction: 'Add 1 tbsp of butter', step_number: 2, recipe_id: 1}
  ])
  await knex('steps_ingr').insert([
    {measurement: 0.5, ingredient_id: 1, step_id: 1},
    {measurement: 3, ingredient_id: 2, step_id: 2}
  ])

};
