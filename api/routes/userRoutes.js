const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const { 
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
    } = require('../controllers/userControllers')

router.route('/').get(protect, getUsers).post(protect, createUser)
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser)

router.get('/:id', protect, getUser)


module.exports = router