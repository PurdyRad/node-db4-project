const db = require('../data/db-config');

function getRecipes() {
    return db('recipes');
}

async function getRecipeById(id) {
    const row = await db('recipes as r')
    .join('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('steps_ingr as si', 's.step_id', 'si.step_id')
    .leftJoin('ingredients as i', 'si.ingredient_id', 'i.ingredient_id')
    .select('r.recipe_id', 'r.recipe_name', 'r.created_at', 's.step_id', 's.step_number', 's.step_instruction', 'i.ingredient_id', 'i.ingredient_name', 'si.measurement')
    .where('r.recipe_id', id)
    .orderBy('s.step_number', 'asc')
    
    const result = {}
    row.forEach(thing => {
        if(!result.recipe_id && !result.recipe_name && !result.created_at) {
            result.recipe_id = thing.recipe_id
            result.recipe_name = thing.recipe_name
            result.created_at = thing.created_at
            result.steps = []
        } if (thing.step_id) {
            result.steps.push({
                'step_id': thing.step_id,
                 'step_number': thing.step_number,
                  'step_instructions': thing.step_instruction,
                   'ingredients': []})
        } if (thing.ingredient_id) {
            result.steps[thing.step_number - 1].ingredients.push({
                'ingredient_id': thing.ingredient_id,
                 'ingredient_name': thing.ingredient_name,
                  'quantity': thing.measurement})
        }
    })
    return result;
}

module.exports = {
    getRecipes,
    getRecipeById
}