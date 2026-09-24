import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ParentSheetModal from './Parent/ParentSheetModal';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';
import {setDarkStatusBar} from '../Constants/MyStyling';

const VISIBLE_ROWS = 6;
const ROW_HEIGHT = hp(8.2);

const ProfileHeaderCard = props => {
  const [open, setOpen] = useState(false);
  const isDetails = props?.dropdownType === 'details';
  const list = props?.dropdownList || [];
  const valueField = isDetails ? 'key' : 'value';

  const openSheet = () => {
    setDarkStatusBar();
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
    setDarkStatusBar();
  };

  const renderRow = ({item}) => (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.85}
      onPress={() => {
        props?.onItemSelect?.(item);
        closeSheet();
      }}>
      <View style={styles.iconBox}>
        <Image source={item?.icon} style={styles.icon} />
      </View>
      {isDetails ? (
        <View style={styles.flex1}>
          <Text style={styles.detailLabel} numberOfLines={1}>
            {item?.label}
          </Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {item?.value}
          </Text>
        </View>
      ) : (
        <Text style={styles.menuText} numberOfLines={1}>
          {item?.label}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        <TouchableOpacity
          style={styles.trigger}
          activeOpacity={0.88}
          onPress={openSheet}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText} numberOfLines={1}>
                {props?.student?.initials}
              </Text>
            </View>
            <View>
              <Text style={styles.name} numberOfLines={1}>
                {props?.student?.label}
              </Text>
              <Text style={styles.classText} numberOfLines={1}>
                {props?.student?.classBadge}
              </Text>
            </View>
          </View>
          <View style={styles.arrowBtn}>
            <Icon name="chevron-down" size={wp(4.2)} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ParentSheetModal
        visible={open}
        onClose={closeSheet}
        title={props?.student?.label}
        subtitle={props?.student?.classBadge}
        dismissOnBackdropPress={false}
        tall>
        <FlatList
          data={list}
          keyExtractor={item => String(item?.[valueField] ?? item?.label)}
          renderItem={renderRow}
          style={styles.listScroll}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          showsVerticalScrollIndicator={list.length > VISIBLE_ROWS}
          bounces={list.length > VISIBLE_ROWS}
        />
      </ParentSheetModal>
    </>
  );
};

export default ProfileHeaderCard;

const styles = StyleSheet.create({
  gradient: {borderRadius: wp(4)},
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.8),
    minHeight: hp(14),
  },
  listScroll: {
    flexGrow: 1,
  },
  listContent: {
    paddingHorizontal: wp(1),
    paddingTop: hp(0.4),
    paddingBottom: hp(2.5),
    flexGrow: 1,
  },
  header: {flex: 1, flexDirection: 'row', alignItems: 'center', minWidth: 0},
  avatar: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.m,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
    marginBottom: hp(0.5),
  },
  classText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs5,
    backgroundColor: Colors.whiteOverlay18,
    alignSelf: 'flex-start',
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.55),
    borderRadius: wp(4),
  },
  arrowBtn: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    minHeight: ROW_HEIGHT,
    borderRadius: wp(3),
    marginBottom: hp(0.35),
  },
  flex1: {flex: 1},
  iconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(2.5),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  menuText: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs5,
  },
  detailLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
    width: wp(25),
  },
  detailValue: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
});
