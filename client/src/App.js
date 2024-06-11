import Container from '@mui/material/Container'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components'
import { AddPost } from './pages/AddPost/index'
import { FullPost } from './pages/FullPost'
import { Home } from './pages/Home'
import { Login } from './pages/Login/index'
import { Registration } from './pages/Registration/index'
import { fetchAuthCurrent } from './redux/slices/authSlice'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAuthCurrent())
	}, [])

	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/posts/:id' element={<FullPost />} />
					<Route path='/posts/:id/edit' element={<AddPost />} />
					<Route path='/add-post' element={<AddPost />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
