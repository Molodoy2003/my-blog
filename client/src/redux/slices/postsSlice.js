import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags')
	return data
})

export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async id => {
		await axios.delete(`/posts/delete/${id}`)
	}
)

const initialState = {
	posts: [],
	tags: [],
	isLoading: false,
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	// Получение статей
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			state.posts = []
			state.isLoading = true
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.isLoading = false
			state.posts = action.payload
		})
		builder.addCase(fetchPosts.rejected, state => {
			state.isLoading = false
			state.posts = []
		})

		// Получение тэгов
		builder.addCase(fetchTags.pending, state => {
			state.isLoading = true
			state.tags = []
		})
		builder.addCase(fetchTags.fulfilled, (state, action) => {
			state.isLoading = false
			state.tags = action.payload
		})
		builder.addCase(fetchTags.rejected, state => {
			state.isLoading = false
			state.tags = []
		})

		// Удаление статьи
		builder.addCase(fetchRemovePost.pending, (state, action) => {
			state.posts = state.posts.filter(post => post._id !== action.meta.arg)
		})
	},
})

export const {} = postsSlice.actions

export default postsSlice.reducer
