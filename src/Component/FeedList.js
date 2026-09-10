import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';
import {FEED_DATA} from '../Constants/dummydata';
import {hp} from '../Constants/Responsive';

const FeedList = props => {
  const type = props?.type ?? props?.route?.params?.type;
  const feedData = type
    ? FEED_DATA.filter(item => item.type === type)
    : FEED_DATA;

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <FeedListItem item={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        bounces={false}
        nestedScrollEnabled
      />
    </View>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
});
