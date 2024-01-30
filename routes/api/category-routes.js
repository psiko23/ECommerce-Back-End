const router = require('express').Router();
const { Category, Product } = require('../../models');



// const test = async () => {
//   const categories = await Category.findAll();
//   console.log(categories);
// }
// test();


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories and their products
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock']}],
    });
    res.json(categories);
  } catch(err) {
    res.status(500).json(`Error getting categories: ${err}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
      // find one category by its `id` value and its associated products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock']}],
    });
  res.status(200).json(category)
  } catch(err) {
    res.status(500).json(`Error getting category with id: ${req.params.id}`)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch(err) {
    res.status(500).json(`Internal error creating new category: ${req.body.category_name}`)
  }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
  try{
    const updateCategoryName = await Category.update(
      { category_name: req.body.category_name }, 
      {
      where: {
        id: req.params.id,
      }, 
    });
    console.log()
    res.status(200).json(updateCategoryName);
  }catch(err) {
    res.status(500).json(`Error updating category at id: ${req.params.id}`)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategory)
  }catch(err) {
    res.status(500).json(`Error deleting category at id: ${req.params.id}`);
  }
});

module.exports = router;
