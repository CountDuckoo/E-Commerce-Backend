const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category}, {model: Tag}],
    });
    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category}, {model: Tag}],
    });

    if(!productData) {
      res.status(404).json({ message: 'No product found with that id.'});
      return;
    }

    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
{
  "product_name": "Basketball",
  "price": 200.00,
  "stock": 3,
  "tagIds": [1, 2, 3, 4],
  "categoryId": 1
}
  */
  try {
    const productData = await Product.create(req.body);
    // if there is a category, need to set the category
    if (req.body.categoryId){
      const categoryCheck = await Category.findByPk(req.body.categoryId);
      if (categoryCheck){
        productData.setCategory(categoryCheck);
      }
    }
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      ProductTag.bulkCreate(productTagIdArr);
      return res.json(productTagIdArr);
    }
    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if there is a category, need to update the category
    if (req.body.categoryId){
      const categoryCheck = await Category.findByPk(req.body.categoryId);
      const productToUpdate = await Product.findByPk(req.params.id);
      if (categoryCheck){
        productToUpdate.setCategory(categoryCheck);
      }
    }
    if (req.body.tagIds?.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });
      // create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      // run both actions
      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      await ProductTag.bulkCreate(newProductTags);
    }
    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData){
      res.status(404).json({ message: 'No product found with that id.' });
      return;
    }

    res.json('Product deleted.');
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});



module.exports = router;
