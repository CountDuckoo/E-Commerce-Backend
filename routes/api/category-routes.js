const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id.'});
      return;
    }

    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  // just needs name; a category can have any number of products, including 0
  // products will be handled on the product side
  try {
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // can have name, products will be handled on the product side
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData){
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }

    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData){
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }

    res.json('Category deleted.');
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
