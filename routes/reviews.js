const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { upload } = require('../config/cloudinary');

// GET all approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST new review (with image upload)
// 'image' matches the name attribute of the file input in the frontend
router.post('/', (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      console.error('Multer upload error:', err);
      return res.status(500).json({ error: 'Image upload failed: ' + err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    let imageUrl = null;

    if (req.file) {
      // req.file.path contains the Cloudinary URL because of multer-storage-cloudinary
      imageUrl = req.file.path; 
    }

    const newReview = new Review({
      name,
      rating: Number(rating),
      comment,
      imageUrl
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review: ' + error.message });
  }
});

module.exports = router;
