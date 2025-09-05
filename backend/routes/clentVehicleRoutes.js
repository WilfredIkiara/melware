const express = require('express');
const router = express.Router();
const clientVehicleController = require('../controllers/clientVehicleController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

// Route to get all vehicles for a specific client by their email
router.get('/:email', authenticateToken, requireReadAccess, clientVehicleController.getClientVehiclesByEmail);

// Route to create a new vehicle for a client (using their email in the body)
router.post('/', authenticateToken, requireWriteAccess, clientVehicleController.createClientVehicle);

// Route to update a specific vehicle using its ID and the client's email
router.put('/:email/:vehicleId', authenticateToken, requireWriteAccess, clientVehicleController.updateClientVehicle);

// Route to delete a specific vehicle using its ID and the client's email
router.delete('/:email/:vehicleId', authenticateToken, requireWriteAccess, clientVehicleController.deleteClientVehicle);

module.exports = router;
