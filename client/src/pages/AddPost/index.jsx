import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import React, { useEffect, useRef, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios.js'
import styles from './AddPost.module.scss'

export const AddPost = () => {
	const [state, setState] = useState({
		title: '',
		text: '',
		tags: '',
		imageUrl: '',
	})
	const inputFileRef = useRef()
	const navigate = useNavigate()
	const { id } = useParams()
	const isEditing = Boolean(id)

	const handleChangeFile = async e => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/posts/upload', formData)
			setState(prev => ({
				...prev,
				imageUrl: data.url,
			}))
		} catch (error) {
			console.warn(error)
		}
	}

	const onClickRemoveImage = () => {
		setState(prev => ({
			...prev,
			imageUrl: '',
		}))
	}

	const onChange = React.useCallback(value => {
		setState(prev => ({
			...prev,
			text: value,
		}))
	}, [])

	const onSubmit = async () => {
		try {
			const fields = { ...state }
			const { data } = isEditing
				? await axios.patch(`/posts/update/${id}`, fields)
				: await axios.post('/posts/create', fields)

			const _id = isEditing ? id : data._id

			navigate(`/posts/${_id}`)
		} catch (error) {
			console.warn(error)
		}
	}

	useEffect(() => {
		if (id) {
			axios.get(`posts/${id}`).then(({ data }) => {
				setState(data)
			})
		}
	}, [])

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	)

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant='outlined'
				size='large'
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type='file'
				onChange={handleChangeFile}
				hidden
			/>
			{state.imageUrl && (
				<>
					<Button
						variant='contained'
						color='error'
						onClick={onClickRemoveImage}
					>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:8080${state.imageUrl}`}
						alt='Uploaded'
					/>
				</>
			)}

			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
				value={state.title}
				onChange={e => setState(prev => ({ ...prev, title: e.target.value }))}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant='standard'
				value={state.tags}
				onChange={e => setState(prev => ({ ...prev, tags: e.target.value }))}
				placeholder='Тэги'
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={state.text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size='large' variant='contained'>
					{isEditing ? 'Сохранить' : 'Опубликовать'}
				</Button>
				<Link to='/'>
					<Button size='large'>Отмена</Button>
				</Link>
			</div>
		</Paper>
	)
}
