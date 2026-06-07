const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const createAbsenceSchema = Joi.object({
  nama: Joi.string().max(100).required(),
  alamat: Joi.string().max(255).required(),
  jenis_kelamin: Joi.string().valid('L', 'P').required(),
  tanggal_absen: Joi.date().required(),
  jam_masuk: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(), // HH:mm format
  jam_keluar: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
});

const updateAbsenceSchema = Joi.object({
  nama: Joi.string().max(100),
  alamat: Joi.string().max(255),
  jenis_kelamin: Joi.string().valid('L', 'P'),
  tanggal_absen: Joi.date(),
  jam_masuk: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
  jam_keluar: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
}).min(1);

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid('nama', 'tanggal_absen', 'created_at').default('created_at'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  nama: Joi.string(),
  jenis_kelamin: Joi.string().valid('L', 'P'),
});

module.exports = {
  loginSchema,
  createAbsenceSchema,
  updateAbsenceSchema,
  paginationSchema,
};
