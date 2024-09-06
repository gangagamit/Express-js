const express = require('express');
const { showBlogPage, addBlog } = require('../controller/blog.controller');
const blogRoutes = express.Router();

blogRoutes.get("/", showBlogPage);
blogRoutes.post("/", addBlog);


module.exports = blogRoutes;