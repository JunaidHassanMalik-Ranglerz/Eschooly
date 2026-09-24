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
      const selected = item.value === selectedId;
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
          <PersonAvatar person={item} size={wp(11)} />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
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
      onClose={onClose}
      title={Strings.switchStudent}
      subtitle={`${childrenList.length} ${Strings.linked}`}
      dismissOnBackdropPress={false}
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
    flexGrow: 1,
  },
  listContent: {
    paddingHorizontal: wp(1),
    paddingTop: hp(0.4),
    paddingBottom: hp(2.5),
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.6),
    minHeight: ROW_HEIGHT,
    borderRadius: wp(3),
    marginBottom: hp(0.55),
  },
  rowSelected: {
    backgroundColor: Colors.whiteOverlay18,
  },
  info: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: 'center',
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
  radio: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
    borderWidth: 1.5,
    borderColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
