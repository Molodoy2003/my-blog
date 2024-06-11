import React from 'react'
import styles from './UserInfo.module.scss'

export const UserInfo = ({ user, additionalText }) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={user.avatarUrl || '/noavatar.png'}
				alt={user.username}
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{user.username}</span>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	)
}
