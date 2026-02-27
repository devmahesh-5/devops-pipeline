import app from './app.js';

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running at http://localhost:3000/');
});
