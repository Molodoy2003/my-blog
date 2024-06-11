import Post from '../models/Post.js'

export const create = async (req, res) => {
	try {
		const doc = new Post({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags.split(','),
			user: req.userId,
		})

		const post = await doc.save()

		res.json(post)
	} catch (error) {
		res.status(400).json({ message: 'Ошибка при создании статьи' })
	}
}

export const getAll = async (req, res) => {
	try {
		const posts = await Post.find().populate('user').exec()

		res.json(posts)
	} catch (error) {
		res.status(400).json({ message: 'Ошибка при получении статей' })
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		const post = await Post.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { views: 1 },
			},
			{
				returnDocument: 'after',
			}
		).populate('user')
		if (!post) {
			return res.status(404).json({ message: 'Статья не найдена' })
		}

		// если просто нужно найти статью по айдишнику
		// const post = await Post.findById({
		// 	_id: postId,
		// })

		res.json(post)
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при получении статьи' })
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		const post = await Post.findOneAndDelete({
			_id: postId,
		})

		if (!post) {
			return res.json({ message: 'Не удалось удалить статью' })
		}

		const deletePostInfo = {
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
		}

		res.json({ message: 'Пост удален!', deletePostInfo })
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при удалении статьи' })
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await Post.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags,
				user: req.userId,
			}
		)

		res.json({ message: 'Пост обновлён' })
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при обновлении статьи' })
	}
}
