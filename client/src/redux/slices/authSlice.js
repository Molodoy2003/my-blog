import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async params => {
	const { data } = await axios.post('/auth/login', params)
	return data
})

export const fetchAuthCurrent = createAsyncThunk(
	'auth/fetchAuthCurrent',
	async () => {
		const { data } = await axios.get('/auth/current')
		return data
	}
)

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async params => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

const initialState = {
	data: null,
	isLoading: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.data = null
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAuth.pending, state => {
			state.data = null
			state.isLoading = true
		})
		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.isLoading = false
			state.data = action.payload
		})
		builder.addCase(fetchAuth.rejected, state => {
			state.isLoading = false
			state.data = null
		})
		builder.addCase(fetchAuthCurrent.pending, state => {
			state.data = null
			state.isLoading = true
		})
		builder.addCase(fetchAuthCurrent.fulfilled, (state, action) => {
			state.isLoading = false
			state.data = action.payload
		})
		builder.addCase(fetchAuthCurrent.rejected, state => {
			state.isLoading = false
			state.data = null
		})
		builder.addCase(fetchRegister.pending, state => {
			state.data = null
			state.isLoading = true
		})
		builder.addCase(fetchRegister.fulfilled, (state, action) => {
			state.isLoading = false
			state.data = action.payload
		})
		builder.addCase(fetchRegister.rejected, state => {
			state.isLoading = false
			state.data = null
		})
	},
})

export const selectIsAuth = state => Boolean(state.auth.data)
export const { logout } = authSlice.actions

export default authSlice.reducer
