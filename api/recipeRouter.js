const express = require('express');
const Recipe = require('./recipeModel');

const router = express.Router();

router.get('/', (req,res,next) => {
    Recipe.getRecipes()
    .then(recipes =>{
        res.status(200).json(recipes);
    })
    .catch(next);
});

router.get('/:id', (req,res,next) => {
    const {id} = req.params;
    Recipe.getRecipeById(id)
    .then(recip => {
        res.json(recip);
    })
    .catch(next);
});


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = router;