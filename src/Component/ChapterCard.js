import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TopicItem from './TopicItem';
import ProgressBar from './ProgressBar';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const ChapterCard = props => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={() => props?.onToggle?.()}>
        <View style={styles.numberBox}>
          <Text style={styles.number} numberOfLines={1}>{props?.chapter?.number}</Text>
        </View>

        <View style={styles.headerCenter}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{props?.chapter?.title}</Text>
            <Icon
              name={props?.open ? 'chevron-up' : 'chevron-down'}
              size={wp(4.5)}
              color={Colors.grayText}
            />
          </View>
          <Text style={styles.meta} numberOfLines={1}>{props?.chapter?.meta}</Text>

          <View style={styles.progressRow}>
            <ProgressBar
              progress={props?.chapter?.progress}
              style={styles.progressBar}
            />
            <Text style={styles.percent} numberOfLines={1}>
              {props?.chapter?.percentText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {props?.open && props?.chapter?.topics?.length > 0 && (
        <FlatList
          data={props?.chapter?.topics}
          keyExtractor={item => item?.id}
          renderItem={({item}) => <TopicItem topic={item} />}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={styles.topics}
        />
      )}
    </View>
  );
};

export default ChapterCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  numberBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  number: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
  headerCenter: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.1),
    marginRight: wp(2),
    width:wp(30),
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.67),
    marginTop: hp(0.3),
    marginBottom: hp(1),
    width:wp(40)
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    marginRight: wp(1),
    height: hp(0.7),
    borderRadius: hp(0.35),
  },
  percent: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: wp(2.8),
    textAlign: 'right',
    minWidth: wp(9),
  },
  topics: {
    marginTop: hp(0.5),
  },
});
