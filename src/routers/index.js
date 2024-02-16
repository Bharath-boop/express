import express, { Router } from 'express'
import indexController from '../controller/index.js'
import userRouter from './user.js'
import sidebarcontroller from '../controller/sidebar.js'

const router = express.Router()

router.get('/', indexController.homePage)
router.use('/side', sidebarcontroller.data)
router.use('/user', userRouter)



export default router
