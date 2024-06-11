import { Router } from 'express'
import multer from 'multer'
import {
	create,
	getAll,
	getOne,
	remove,
	update,
} from '../controllers/post_controller.js'
import ValidationErrors from '../middleware/ValidationErrors.js'
import checkIsAuth from '../middleware/checkIsAuth.js'
import { postCreateValidation } from '../validations/validations.js'

const router = new Router()

const storage = multer.diskStorage({
	destination: (_, d, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })

router.post('/upload', checkIsAuth, upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` })
})

router.get('/', getAll)
router.get('/:id', getOne)
router.post(
	'/create',
	checkIsAuth,
	ValidationErrors,
	postCreateValidation,
	create
)
router.delete('/delete/:id', checkIsAuth, remove)
router.patch('/update/:id', checkIsAuth, ValidationErrors, update)

export default router
