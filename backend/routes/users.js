const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:email', authenticateToken, userController.getUserByEmail);
router.put('/update', authenticateToken, userController.updateUser);
router.delete('/:email', authenticateToken, userController.deleteUser);
module.exports = router;
