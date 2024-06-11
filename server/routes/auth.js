import { Router } from 'express'
import { current, login, register } from '../controllers/user_controller.js'
import ValidationErrors from '../middleware/ValidationErrors.js'
import checkIsAuth from '../middleware/checkIsAuth.js'
import {
	loginValidation,
	registerValidation,
} from './../validations/validations.js'

const router = new Router()

router.post('/register', registerValidation, ValidationErrors, register)
router.post('/login', loginValidation, ValidationErrors, login)
router.get('/current', checkIsAuth, current)

export default router
