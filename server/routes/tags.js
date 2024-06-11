import { Router } from 'express'
import { getTags } from '../controllers/tags_controller.js'

const router = new Router()

router.get('/', getTags)

export default router
