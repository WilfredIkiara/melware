const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all clients
// authenticateToken,
router.get('/',  clientController.getAllClients);

// Get a single client's details
// authenticateToken,
router.get('/:id',  clientController.getClientDetails);

// Update a client's details
// authenticateToken,
router.put('/:id',  clientController.updateClient);
router.get('/:id/vehicles', clientController.getClientVehicles);
// router.put('/vehicles/:vehicleId', clientController.updateClientVehicle);
// Get client services
router.get('/:id/services', clientController.getClientServices);
router.get('/getStaff/:id', clientController.getClientStaff);
// Add to clients.js
// router.post('/:id/services', clientController.addClientService);
router.post('/:id/vehicles', clientController.addClientVehicle);
router.post('/:id/services', clientController.addClientService);
router.put('/vehicles/:vehicleId', clientController.updateClientVehicle);

module.exports = router;
