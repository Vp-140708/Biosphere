const express = require('express');
const { addReview, getReviews, deleteAllReviews } = require('../controllers/reviewController');
const router = express.Router();

router.post('/add', addReview);
router.get('/', getReviews);
router.delete('/delete-all', deleteAllReviews);

module.exports = router;
