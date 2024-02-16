import express from 'express'
import sideController from '../controller/sidebar.js'

const router = express.Router()

router.get('/', sideController.data)

export default router