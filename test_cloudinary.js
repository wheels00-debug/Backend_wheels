require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.cloudinary_API_KEY,
  api_secret: process.env.cloudinary_API_SECRET
});

console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.cloudinary_API_KEY);
console.log('API Secret:', process.env.cloudinary_API_SECRET ? 'Loaded' : 'Missing');

cloudinary.api.ping(function(error, result) {
  if (error) {
    console.error('Cloudinary Ping Error:', error);
  } else {
    console.log('Cloudinary Ping Result:', result);
  }
});
