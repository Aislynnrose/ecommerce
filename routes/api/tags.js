const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags including associated product data
  Tag.findAll({
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
  // find a single tag by its `id` inlcuding Product data
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
  // create a new tag
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
  // update a tag's name by its `id` value
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
  // delete on tag by its `id` value
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