const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(categoryData){
      res.status(200).json(categoryData);
      return;
    }
    res.status(404).json('Category was found.')

  }catch(err){
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err)
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  try{
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where:{
          id: req.params.id,
        },
      }
    )
    if(updatedCategory){
      res.status(200).json(updatedCategory);
      return;
    }
    res.status(404).json('Category id not found.')
    }catch(err){
      res.status(500).json(err)
    }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try{
    const category = await Category.findOne({
        where: {
          id: req.params.id,
        },
    });
    if(category){
      await category.destroy();
      res.status(200).json(category);
      return;
    }
    res.status(404).json('Category with id not found.')
  }catch(err){
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
