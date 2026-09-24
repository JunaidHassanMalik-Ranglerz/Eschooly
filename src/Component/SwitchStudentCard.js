import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ChildSwitchModal from './Parent/ChildSwitchModal';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const SwitchStudentCard = ({students, selectedId, onSelect}) => {
  const [open, setOpen] = useState(false);
  const student =
    students.find(item => item.value === selectedId) || students[0];

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
          onPress={() => setOpen(true)}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{student?.initials}</Text>
            </View>
            <View>
              <Text style={styles.name}>{student?.label}</Text>
              <Text style={styles.classText}>{student?.classBadge}</Text>
            </View>
          </View>
          <View style={styles.arrowBtn}>
            <Icon name="chevron-down" size={wp(4.2)} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ChildSwitchModal
        visible={open}
        childrenList={students}
        selectedId={selectedId}
        onSelect={onSelect}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default SwitchStudentCard;

const styles = StyleSheet.create({
  gradient: {
    borderRadius: wp(4),
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2.2),
    minHeight: hp(10),
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    marginBottom: hp(0.4),
  },
  classText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    backgroundColor: Colors.whiteOverlay18,
    alignSelf: 'flex-start',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  arrowBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
