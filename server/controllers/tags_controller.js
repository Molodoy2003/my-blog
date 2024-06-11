import Post from '../models/Post.js'

export const getTags = async (req, res) => {
	try {
		const posts = await Post.find().limit(5).exec()

		if (!posts.length) {
			return res.status(404).json({ message: 'Посты не найдены' })
		}

		const tags = posts.flatMap(post => post.tags).slice(0, 5)

		if (!tags.length) {
			return res.status(404).json({ message: 'Теги не найдены' })
		}

		res.json(tags)
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: 'Ошибка при получении тэгов' })
	}
}
