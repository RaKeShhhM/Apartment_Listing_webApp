const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');

cloudinary.config({//BY DEFAULT WE WRITE cloud_name,api_key,and api_secret here as keys
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderPhotos",
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

module.exports={
    cloudinary,storage
};