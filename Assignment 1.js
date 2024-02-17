const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
function checkIfValidAuthor(req) {
return true; 
}
const authenticateAuthor = (req, res, next) => {
  const isValidAuthor = checkIfValidAuthor(req);
  if (!isValidAuthor) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
app.post('/register', (req, res, next) => {
res.json({ message: 'Author registered successfully' });
});
app.get('/blogs', authenticateAuthor, (req, res) => {

  const blogs = getAllBlogs(); 
  res.json(blogs);
});
app.post('/blogs', authenticateAuthor, (req, res) => {
  
  res.json({ message: 'Blog created successfully' });
});
app.get('/blogs/:authorId', authenticateAuthor, (req, res) => {
  const authorId = req.params.authorId;
  
  const blog = getBlogByAuthorId(authorId); 
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  res.json(blog);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
