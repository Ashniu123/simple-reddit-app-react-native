import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
        height: 100,
        padding: 15,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.3)',
      },
      thumbnailSection: {
        width: 80
      },
      textSection: {
        flex: 1
	  },
	  title: {
		
	  },
      subreddit: {
        color: '#999',
		fontSize: 11,
		fontWeight: 'bold'
      }
});

const PostItem = (props) => (
	<View style={styles.container}>
        <View style={styles.thumbnailSection}>
          {
            props.thumbnail ?
            <Image
              style={{width: 60, height: 60}}
              source={{uri: props.thumbnail}}
            /> :
            <View
              style={{width: 60, height: 60, backgroundColor: '#eee'}}
            />
          }
        </View>
        <View style={styles.textSection}>
          <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
          <Text style={styles.subreddit}>{props.subreddit}</Text>
        </View>
      </View>
);

export default PostItem;