import express from 'express'
import userController from '../controller/user.js'

const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.addUser)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)


export default router