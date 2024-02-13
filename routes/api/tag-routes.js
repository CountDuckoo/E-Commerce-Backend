const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if(!tagData) {
      res.status(404).json({ message: 'No tag found with that id.'});
      return;
    }

    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  // if there are products, need to create pairings to bulk create in the ProductTag model
  try {
    const tagData = await Tag.create(req.body);
    if(req.body.productIds?.length){
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: tagData.id,
        };
      });
      ProductTag.bulkCreate(productTagIdArr);
      return res.json(productTagIdArr);
    }
    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // just needs name
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(req.body.productIds?.length){
      const productTags = await ProductTag.findAll({
        where: { tag_id: req.params.id },
      });
      const productTagIds = productTags.map(({ product_id }) => product_id);
      const newProductTags = req.body.productIds
        .filter((product_id) => !productTagIds.includes(product_id))
        .map((product_id) => {
          return {
            product_id,
            tag_id: req.params.id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);
      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      await ProductTag.bulkCreate(newProductTags);
    }
    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData){
      res.status(404).json({ message: 'No tag found with that id.' });
      return;
    }

    res.json('Tag deleted.');
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
