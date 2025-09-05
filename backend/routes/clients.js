const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const clientServiceController = require('../controllers/clientServicesController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/authMiddleware');

// Route to get all clients
router.get('/', authenticateToken, requireReadAccess, clientController.getAllClients);

// Route to get a single client by email
router.get('/:email', authenticateToken, requireReadAccess, clientController.getClientByEmail);

// Route to create a new client
router.post('/', authenticateToken, requireWriteAccess, clientController.createClient);

// Route to update a client's details by email
router.put('/:email', authenticateToken, requireWriteAccess, clientController.updateClientByEmail);

// Route to delete a client by email
router.delete('/:email', authenticateToken, requireWriteAccess, clientController.deleteClientByEmail);
router.get('/:email', authenticateToken, requireReadAccess, clientServiceController.getClientServicesByEmail);

// Route to create a new service for a client (using their email in the body)
router.post('/', authenticateToken, requireWriteAccess, clientServiceController.createClientService);

// Route to update a specific service using its ID and the client's email
router.put('/:email/:serviceId', authenticateToken, requireWriteAccess, clientServiceController.updateClientService);

// Route to delete a specific service using its ID and the client's email
router.delete('/:email/:serviceId', authenticateToken, requireWriteAccess, clientServiceController.deleteClientService);
module.exports = router;
