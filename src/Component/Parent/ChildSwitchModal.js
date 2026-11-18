import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParentSheetModal from './ParentSheetModal';
import PersonAvatar from '../Profile/PersonAvatar';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ROW_HEIGHT = hp(8.2);

const ChildSwitchModal = ({
  visible,
  childrenList = [],
  selectedId,
  onSelect,
  onClose,
}) => {
  const renderItem = useCallback(
    ({item}) => {
      const selected = String(item.value) === String(selectedId);
      const classText =
        item.className && item.section
          ? `${item.className} ${item.section}`
          : item.classBadge || item.classInfo || item.meta;

      return (
        <TouchableOpacity
          style={[styles.row, selected && styles.rowSelected]}
          activeOpacity={0.85}
          onPress={() => {
            onSelect?.(item.value);
            onClose?.();
          }}>
          <PersonAvatar
            person={item}
            size={wp(11)}
            borderWidth={StyleSheet.hairlineWidth * 2}
            borderColor={selected ? Colors.brandRoyal : Colors.borderSubtle}
          />
          <View style={styles.info}>
            <Text
              style={[styles.name, selected && styles.nameSelected]}
              numberOfLines={1}>
              {item.label}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {classText}
            </Text>
          </View>
          <View style={[styles.radio, selected && styles.radioSelected]}>
            {selected ? (
              <Icon name="checkmark" size={wp(3.5)} color={Colors.white} />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    [onClose, onSelect, selectedId],
  );

  return (
    <ParentSheetModal
      visible={visible}
      variant="ice"
      onClose={onClose}
      title={Strings.switchStudent}
      subtitle={`${childrenList.length} ${Strings.linked}`}
      dismissOnBackdropPress
      dismissOnBackPress
      tall>
      <FlatList
        data={childrenList}
        keyExtractor={item => String(item.value)}
        renderItem={renderItem}
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={childrenList.length > 5}
        bounces={childrenList.length > 5}
      />
    </ParentSheetModal>
  );
};

export default ChildSwitchModal;

const styles = StyleSheet.create({
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: wp(1.6),
    paddingTop: hp(0.2),
    paddingBottom: hp(1.6),
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(1.25),
    minHeight: ROW_HEIGHT,
    borderRadius: wp(4),
    marginBottom: hp(0.7),
    backgroundColor: Colors.bannerIceStart,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
  rowSelected: {
    backgroundColor: Colors.hubCard,
    borderColor: Colors.brandRoyal,
  },
  info: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(3),
    justifyContent: 'center',
  },
  name: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  nameSelected: {
    fontFamily: Fonts.bold,
  },
  meta: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
  radio: {
    width: wp(5.6),
    height: wp(5.6),
    borderRadius: wp(2.8),
    borderWidth: 1.5,
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.bannerIceStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.brandRoyal,
    borderColor: Colors.brandRoyal,
  },
});
