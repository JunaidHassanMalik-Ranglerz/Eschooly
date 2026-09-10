import React, {useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {STUDENT_LIST} from '../Constants/dummydata';
import {wp, hp} from '../Constants/Responsive';

const Dropdown = props => {
  const [visible, setVisible] = useState(false);

  const selectedItem = useMemo(() => {
    return (
      STUDENT_LIST.find(item => item.value === props?.value) || STUDENT_LIST[0]
    );
  }, [props?.value]);

  const handleSelect = value => {
    if (props?.onChange) {
      props?.onChange(value);
    }
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        activeOpacity={0.8}
        onPress={() => setVisible(true)}>
        <View style={styles.textWrap}>
          <Text style={styles.classText}>{selectedItem?.className}</Text>
          <Text style={styles.nameText}>{selectedItem?.label}</Text>
        </View>
        <Icon name="chevron-down" size={wp(5)} color={Colors.primary} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect(STUDENT_LIST[0]?.value)}>
              <Text style={styles.classText}>{STUDENT_LIST[0]?.className}</Text>
              <Text style={styles.nameText}>{STUDENT_LIST[0]?.label}</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect(STUDENT_LIST[1]?.value)}>
              <Text style={styles.classText}>{STUDENT_LIST[1]?.className}</Text>
              <Text style={styles.nameText}>{STUDENT_LIST[1]?.label}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  textWrap: {
    flex: 1,
  },
  classText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  nameText: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    marginTop: hp(0.3),
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    justifyContent: 'center',
    paddingHorizontal: wp(6),
  },
  menu: {
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
