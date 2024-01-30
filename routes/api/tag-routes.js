const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tags)
  } catch(err) {
    res.status(500).json(`Error retreiving tag data: ${err}`);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id);
    res.status(200).json(tag);
  } catch(err) {
    res.status(500).json(`Error retreiving tag with id: ${req.params.id}\n${err}`);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch(err) {
    res.status(500).json(`Error creating a new tag: ${err}`);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name }, 
      {
      where: {
        id: req.params.id,
      }, 
    });
    res.status(200).json(updateTag);
  } catch(err) {
    res.status(500).json(`Error updating tag (tag_id = ${req.params.id}) : ${err}`);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteTag)
  } catch(err) {
    res.status(500).json(`Error deleting tag with id: ${req.params.id}\n${err}`);
  }
});

module.exports = router;
