const express = require('express');
const { getAbsences, getAbsence, postAbsence, putAbsence, removeAbsence } = require('../controllers/absenceController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes dengan authentication
router.use(verifyToken);

router.get('/', getAbsences);
router.post('/', postAbsence);
router.get('/:id', getAbsence);
router.put('/:id', putAbsence);
router.delete('/:id', removeAbsence);

module.exports = router;
