import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CommentsBlock } from '../components/CommentsBlock'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { fetchAuth } from '../redux/slices/authSlice.js'
import { fetchPosts, fetchTags } from '../redux/slices/postsSlice.js'

export const Home = () => {
	const dispatch = useDispatch()
	const { posts, tags, isLoading } = useSelector(state => state.posts)
	const { data } = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchTags())
		dispatch(fetchAuth())
	}, [])

	console.log(posts)

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' />
				<Tab label='Популярные' />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isLoading ? [...Array(5)] : posts).map((post, index) =>
						isLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								key={index}
								_id={post._id}
								title={post.title}
								user={post.user}
								createdAt={post.createdAt}
								viewsCount={post.views}
								commentsCount={3}
								tags={post.tags}
								isEditable={data?._id === post.user._id}
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags} isLoading={false} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Егор Мартюг',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Действильно интересные статьи про футбол',
							},
							{
								user: {
									fullName: 'Никита Кривецкий',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'Я болею за Баварию и мне будет интересно читать о ней статьи! Спасибо за блог',
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	)
}
