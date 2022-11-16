const router = require("express").Router();
const {verifyToken, checkRole} = require('../middlewares')
const {allUsers} = require('../controllers/admin.controller')

// Read all users
router.get('/users',verifyToken, checkRole(['Admin']), allUsers)

// Upgrade a user to Admin


module.exports = router;
