import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/auth.js'
import postRouter from './routes/posts.js'
import tagsRouter from './routes/tags.js'

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/uploads', express.static('uploads'))

app.use('/api/auth', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/tags', tagsRouter)

async function start() {
	try {
		await mongoose.connect(
			`mongodb+srv://admin:admin@cluster0.vq4duaw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`
		)

		app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}
start()
