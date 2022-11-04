const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
      }
    });
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })

    if (tag) {
      res.status(200).json(tag);
      return;
    }
    res.status(404).json('Tag with the specified ID is not found.')

  } catch (err) {
    res.status(500).json(err)

  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag)

  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  try {
    let updatedTagName = await Tag.update({
      tag_name: req.body.tag_name
    }, 
    {
      where: {
        id: req.params.id
      }
    })

    if (updatedTagName) {
      res.status(200).json(updatedTagName);
      return;
    }
    res.status(404).json('No tag with that id exists.')
  }
  catch (err) {
    res.status(500).json(err)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try{
    const deletedTag = Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    if(deletedTag){
      res.status(200).json(deletedTag);
      return;
    }
    res.status(404).json('No Tag with that id exists')

  }catch(err){
    res.status(500).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
