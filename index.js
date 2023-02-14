require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db');

const {
  getAllPharmacists,
  getSinglePharmacist,
  postPharmacist,
  putPharmacist,
  deletePharmacist,
  getDivisionPharmacist,
  getDistrictPharmacist,
} = require('./controllers/listController');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use('/api/v1', require('./routes'));

app.get('/api', (_req, res) => {
  res.json({
    message: 'bdpa home page',
  });
});
app.get('/health', (_req, res) => {
  res.json({
    message: 'This server is ok',
  });
});

app.get('/api/list', getAllPharmacists);
app.get('/api/list/:regNumber', getSinglePharmacist);
app.post('/api/list', postPharmacist);
app.put('/api/list/:regNumber', putPharmacist);
app.delete('/api/list/:regNumber', deletePharmacist);

app.get('/api/list/div/:divisionId', getDivisionPharmacist);
app.get('/api/list/dist/:distName', getDistrictPharmacist);
app.get('/api/list/dist/:distName/:upazilaName', async (req, res) => {
  res.json({
    district: req.params.distName,
    upazila: req.params.upazilaName,
  });
});

app.get('/api/users', async (_req, res) => {
  res.json({
    message: 'get all users',
  });
});
app.post('/api/users', async (_req, res) => {
  res.json({
    message: 'post user',
  });
});
app.post('/api/users/:userId/login', async (_req, res) => {
  res.json({
    message: 'post user login',
  });
});
app.put('/api/users/:userId/reset-password', async (_req, res) => {
  res.json({
    message: 'put user reset-password',
  });
});
app.put('/api/users/:userId/forgot-password', async (_req, res) => {
  res.json({
    message: 'put user forgot-password',
  });
});
app.put('/api/users/:userId/update', async (_req, res) => {
  res.json({
    message: 'put user update',
  });
});
app.delete('/api/users/:userId', async (_req, res) => {
  res.json({
    message: 'delete user',
  });
});

app.use((_req, _res, next) => {
  const error = new Error('Page not found!');
  error.status = 400;

  next(error);
});

app.use((err, _req, res, _next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? 'Server error occurred!' });
});

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
