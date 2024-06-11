import { body } from 'express-validator'

export const registerValidation = [
	// проверка email, password, username, avatarUrl на валидность
	body('email', 'Неверный формат').isEmail(),
	body('password', 'Должен быть минимум 5 символов').isLength({ min: 5 }),
	body('username', 'Укажите имя').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка').optional().isURL(),
]

export const loginValidation = [
	body('email', 'Неверный формат').isEmail(),
	body('password', 'Должен быть минимум 5 символов').isLength({ min: 5 }),
]

export const postCreateValidation = [
	body('title', 'Введите заголовок').isLength({ min: 3 }).isString(),
	body('text', 'Введите текст').isLength({ min: 3 }).isString(),
	body('tags', 'Неверный формат тэгов').optional().isString(),
	body('imageUrl', 'Неверная ссылка').optional().isString(),
]
