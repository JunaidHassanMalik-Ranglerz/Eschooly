import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ChildSwitchModal = ({visible, childrenList, selectedId, onSelect, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{Strings.switchStudent}</Text>
            <Text style={styles.count}>
              {childrenList.length} {Strings.linked}
            </Text>
          </View>

          {childrenList.map(item => {
            const selected = item.value === selectedId;
            return (
              <TouchableOpacity
                key={item.value}
                style={[styles.row, selected && styles.rowSelected]}
                activeOpacity={0.85}
                onPress={() => {
                  onSelect?.(item.value);
                  onClose?.();
                }}>
                <View style={[styles.avatar, selected && styles.avatarActive]}>
                  <Text style={[styles.initials, selected && styles.initialsActive]}>
                    {item.initials}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.label}</Text>
                  <Text style={styles.meta}>{item.meta}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected ? (
                    <Icon name="checkmark" size={wp(3.5)} color={Colors.white} />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ChildSwitchModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    justifyContent: 'center',
    paddingHorizontal: wp(6),
  },
  sheet: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(1),
  },
  title: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.6,
  },
  count: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.4),
    borderRadius: wp(3),
  },
  rowSelected: {
    backgroundColor: Colors.parentBg,
  },
  avatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  initials: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
  },
  initialsActive: {
    color: Colors.white,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  radio: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
