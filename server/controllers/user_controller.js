import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
	try {
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)

		const doc = new User({
			email: req.body.email,
			username: req.body.username,
			avatarUrl: req.body.avatarUrl,
			passwordHash,
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		res.json({
			...user._doc,
			token,
		})
	} catch (error) {
		res.status(500).json({ message: 'Ошибка регистрации' }, err)
	}
}

export const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })

		if (!user) {
			return res.status(400).json({ message: 'User не нейден' })
		}

		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)

		if (!isValidPassword) {
			return res.status(400).json({ message: 'Неверный логин или пароль' })
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		res.json({
			...user._doc,
			token,
		})
	} catch (error) {
		res.status(400).json({ message: 'Ошибка при входе' })
	}
}

export const current = async (req, res) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		res.json(user)
	} catch (error) {
		res.status(400).json({ message: 'Ошибка при поиске пользователя' })
	}
}
