import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		height: 100,
		padding: 15,
		flexDirection: 'row',
		marginLeft: 20,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.3)',
	},
	textSection: {
		flex: 1
	},
	detailInfo: {
		flexDirection: 'column',
		flex: 1,
	},
	subreddit: {
		color: '#999',
		fontSize: 11,
		fontWeight: 'bold'
	}
});

const Comment = (props) => (
	<View style={styles.container}>
		<View style={styles.textSection}>
			<Text style={styles.detailInfo} numberOfLines={2}>{props.body}</Text>
			<View style={styles.textSection}>
				<Text style={styles.subreddit}>{props.subreddit}</Text>
				<Text style={styles.subreddit}>r/{props.author}</Text>
			</View>
		</View>
	</View>
);

export default Comment;