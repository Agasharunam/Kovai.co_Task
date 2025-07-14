const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

router.post('/create', folderController.createFolder);
router.get('/:folderName', folderController.readFolder);
router.put('/rename', folderController.renameFolder);
router.delete('/:folderName', folderController.deleteFolder);

module.exports = router;
