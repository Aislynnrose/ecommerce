const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  tag.findAll({
    attribute: ['id', "tag-name"],
    include: [Product],
  })
  .then((allTags) => res.json(allTags))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [Product],
  })
  .then((oneTag) => {
    if (!oneTag) {
      res.status(404).json({ message: "There is no tag with that id!" });
      return;
    }
    res.json(oneTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => res.json(newTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedTag) => {
    if (!updatedTag) {
      res.status(400).json({ message: "No tag found!" });
      return;
    }
    res.json(updatedTag);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((byeTag) => {
      if (!byeTag) {
        res.status(404).json({ message: "No tag found!" });
        return;
      }
      res.json(byeTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
