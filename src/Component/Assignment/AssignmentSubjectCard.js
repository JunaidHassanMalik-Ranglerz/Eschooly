import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AssignmentItem from './AssignmentItem';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const AssignmentSubjectCard = props => {
  const subject = props?.subject;
  const count = subject?.assignments?.length || 0;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.85}
        onPress={() => props?.onToggle?.()}>
        <View
          style={[
            styles.iconWrap,
            {backgroundColor: subject?.iconBg || Colors.duesCardBg},
          ]}>
          <Icon
            name={subject?.icon || 'book-outline'}
            size={wp(5.5)}
            color={subject?.iconColor || Colors.primary}
          />
        </View>

        <View style={styles.headerCenter}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {subject?.name}
            </Text>
            <Icon
              name={props?.open ? 'chevron-up' : 'chevron-down'}
              size={wp(4.5)}
              color={Colors.grayText}
            />
          </View>

          <Text style={styles.meta} numberOfLines={1}>
            {count} {Strings.assignmentsCount}
          </Text>
        </View>

        {subject?.pendingCount > 0 ? (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>{subject?.pendingCount}</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {props?.open && count > 0 ? (
        <FlatList
          data={subject?.assignments}
          keyExtractor={item => item?.id}
          renderItem={({item}) => <AssignmentItem assignment={item} />}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      ) : null}
    </View>
  );
};

export default AssignmentSubjectCard;

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
    alignItems: 'center',
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
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
    fontSize: Fontsize.sm,
    marginRight: wp(2),
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.3),
  },
  pendingBadge: {
    minWidth: wp(6.5),
    height: wp(6.5),
    borderRadius: wp(3.25),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(2),
    paddingHorizontal: wp(1.5),
  },
  pendingText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  list: {
    marginTop: hp(1.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
