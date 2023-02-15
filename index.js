const app = require('./app/app');
const connectDB = require('./db');

connectDB(process.env.NODE_MONGO_URI, {
  connectTimeoutMS: 2000,
  useNewUrlParser: true,
})
  .then(() => {
    console.log('database conected');
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((e) => console.log('mongodb connection faild!', e.message));
