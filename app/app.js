require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {
  getAllPharmacists,
  getSinglePharmacist,
  postPharmacist,
  putPharmacist,
  deletePharmacist,
  getDivisionPharmacist,
  getDistrictPharmacist,
} = require('../controllers/listController');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use('/api/v1', require('../routes'));

app.get('/api/v1/health', (_req, res) => {
  res.json({
    message: 'This server is ok.',
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

app.use((_req, _res, next) => {
  const error = new Error('Page not found!');
  error.status = 404;

  next(error);
});

app.use((err, _req, res, _next) => {
  if (err.errors && Object.keys(err.errors).length > 0) {
    const dbError = Object.keys(err.errors).reduce((acc, cur) => {
      acc[cur] = err.errors[cur]?.message;
      return acc;
    }, {});

    res.status(err.status ?? 500).json(dbError);
  } else if (typeof err.message === 'string' && err.status === 400) {
    res
      .status(err.status)
      .json(JSON.parse(err.message) ?? 'Something went wrong!');
  } else {
    res
      .status(err.status ?? 500)
      .json({ message: err.message ?? 'Server error occurred!' });
  }
});

module.exports = app;
