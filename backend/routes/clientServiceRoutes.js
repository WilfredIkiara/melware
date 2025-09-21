const express = require('express');
const router = express.Router();
const clientServicesController = require('../controllers/clientServicesController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

// Route to get all services for a specific client by their ID
router.get('/:id', authenticateToken, requireReadAccess, clientServicesController.getClientServicesById);

// Route to create a new service for a client
router.post('/', authenticateToken, requireWriteAccess, clientServicesController.createClientService);

// Route to update a specific service using its ID
router.put('/:serviceId', authenticateToken, requireWriteAccess, clientServicesController.updateClientService);

// Route to delete a specific service using its ID
router.delete('/:serviceId', authenticateToken, requireWriteAccess, clientServicesController.deleteClientService);

module.exports = router;