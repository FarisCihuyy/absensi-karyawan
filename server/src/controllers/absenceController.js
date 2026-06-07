const {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} = require("../services/absenceService");
const {
  createAbsenceSchema,
  updateAbsenceSchema,
  paginationSchema,
} = require("../validators/schemas");
const asyncHandler = require("../middleware/asyncHandler");

const getAbsences = asyncHandler(async (req, res) => {
  const { error, value } = paginationSchema.validate(req.query);
  if (error) {
    error.isJoi = true;
    throw error;
  }

  const result = await getAllAbsences(value);

  res.status(200).json({
    success: true,
    message: "Absences retrieved successfully",
    data: result,
  });
});

const getAbsence = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const absence = await getAbsenceById(id);

  res.status(200).json({
    success: true,
    message: "Absence retrieved successfully",
    data: absence,
  });
});

const postAbsence = asyncHandler(async (req, res) => {
  const { error, value } = createAbsenceSchema.validate(req.body);
  if (error) {
    error.isJoi = true;
    throw error;
  }

  const absence = await createAbsence(value);

  res.status(201).json({
    success: true,
    message: "Absence created successfully",
    data: absence,
  });
});

const putAbsence = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { error, value } = updateAbsenceSchema.validate(req.body);
  if (error) {
    error.isJoi = true;
    throw error;
  }

  const oldData = await getAbsenceById(id);

  if (!oldData) {
    throw new Error("Absence not found");
  }

  const absenceData = {
    ...oldData,
    ...value,
    tanggal_absen: value.tanggal_absen || oldData.tanggal_absen,
  };

  const absence = await updateAbsence(id, absenceData);

  res.status(200).json({
    success: true,
    message: "Absence updated successfully",
    data: absence,
  });
});

const removeAbsence = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteAbsence(id);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  getAbsences,
  getAbsence,
  postAbsence,
  putAbsence,
  removeAbsence,
};
