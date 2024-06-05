const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePosts, deletePost } = require('../controllers/postController');
const validateToken = require('../middleware/validateTokenHandler');


router.get('/', getAllPosts);
router.get('/:id', getPostById);

router.use(validateToken);
router.post('/', createPost);
router.put('/:id', updatePosts);
router.delete('/:id', deletePost);

module.exports = router;
