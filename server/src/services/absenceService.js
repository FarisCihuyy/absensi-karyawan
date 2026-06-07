const pool = require('../config/database');
const { NotFoundError } = require('../errors/AppError');

const getAllAbsences = async ({ page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', nama, jenis_kelamin }) => {
  let query = 'SELECT * FROM absences WHERE 1=1';
  const params = [];
  let paramIndex = 1;

  if (nama) {
    query += ` AND nama ILIKE $${paramIndex}`;
    params.push(`%${nama}%`);
    paramIndex++;
  }

  if (jenis_kelamin) {
    query += ` AND jenis_kelamin = $${paramIndex}`;
    params.push(jenis_kelamin);
    paramIndex++;
  }

  // Validate sortBy to prevent SQL injection
  const validSortFields = ['nama', 'tanggal_absen', 'created_at'];
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';
  const sortDir = sortOrder === 'asc' ? 'ASC' : 'DESC';

  // Get total count
  let countQuery = 'SELECT COUNT(*) as total FROM absences WHERE 1=1';
  if (nama) countQuery += ` AND nama ILIKE $1`;
  if (jenis_kelamin) countQuery += ` AND jenis_kelamin = ${nama ? '$2' : '$1'}`;

  const countResult = await pool.query(countQuery, params.slice(0, nama && jenis_kelamin ? 2 : 1));
  const total = parseInt(countResult.rows[0].total, 10);

  // Get paginated data
  const offset = (page - 1) * limit;
  query += ` ORDER BY ${sortField} ${sortDir} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);

  return {
    data: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAbsenceById = async (id) => {
  const query = 'SELECT * FROM absences WHERE id = $1';
  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    throw new NotFoundError('Absence record not found');
  }

  return result.rows[0];
};

const createAbsence = async (data) => {
  const { nama, alamat, jenis_kelamin, tanggal_absen, jam_masuk, jam_keluar } = data;

  const query = `
    INSERT INTO absences (nama, alamat, jenis_kelamin, tanggal_absen, jam_masuk, jam_keluar, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    RETURNING *
  `;

  const result = await pool.query(query, [nama, alamat, jenis_kelamin, tanggal_absen, jam_masuk, jam_keluar]);

  return result.rows[0];
};

const updateAbsence = async (id, data) => {
  const absence = await getAbsenceById(id);

  const { nama = absence.nama, alamat = absence.alamat, jenis_kelamin = absence.jenis_kelamin, tanggal_absen = absence.tanggal_absen, jam_masuk = absence.jam_masuk, jam_keluar = absence.jam_keluar } = data;

  const query = `
    UPDATE absences
    SET nama = $1, alamat = $2, jenis_kelamin = $3, tanggal_absen = $4, jam_masuk = $5, jam_keluar = $6, updated_at = NOW()
    WHERE id = $7
    RETURNING *
  `;

  const result = await pool.query(query, [nama, alamat, jenis_kelamin, tanggal_absen, jam_masuk, jam_keluar, id]);

  return result.rows[0];
};

const deleteAbsence = async (id) => {
  await getAbsenceById(id);

  const query = 'DELETE FROM absences WHERE id = $1';
  await pool.query(query, [id]);

  return { message: 'Absence record deleted successfully' };
};

module.exports = {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
};
