import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import OptionPickerSheetModal from './OptionPickerSheetModal';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from './Profile/ProfileTheme';
import {getSubjectTheme} from './Syllabus/SubjectTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import AnimatedCard from './AnimatedCard';

const SyllabusFilter = props => {
  const [open, setOpen] = useState(false);
  const theme = getSubjectTheme(props?.label);
  const animationIndex = props?.animationIndex ?? 1;
  const subjects = props?.subjects || [];

  return (
    <AnimatedCard index={animationIndex} style={[styles.wrap, IDENTITY_CARD_SHADOW]}>
      <LinearGradient
        colors={theme.gradient}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <TouchableOpacity
          style={styles.dropdownWrap}
          activeOpacity={0.8}
          onPress={() => setOpen(true)}>
          <Icon name={theme.icon} size={wp(5.5)} color={theme.iconColor} />
          <View style={styles.dropdownTextCol}>
            <Text style={styles.subjectLabel} numberOfLines={1}>
              {Strings.subject}
            </Text>
            <Text style={styles.selectedText} numberOfLines={1}>
              {props?.label}
            </Text>
          </View>
          <Icon name="chevron-down" size={wp(4.5)} color={Colors.whiteMuted85} />
        </TouchableOpacity>

        <View style={styles.classBadge}>
          <Icon name="school-outline" size={wp(4)} color={Colors.white} />
          <Text style={styles.classText} numberOfLines={1}>
            {props?.className}
          </Text>
        </View>
      </LinearGradient>

      <OptionPickerSheetModal
        visible={open}
        onClose={() => setOpen(false)}
        title={Strings.subject}
        subtitle={props?.label}
        data={subjects}
        selectedValue={props?.value}
        onSelect={item => props?.onChange?.(item)}
      />
    </AnimatedCard>
  );
};

export default SyllabusFilter;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
    borderRadius: CARD_RADIUS,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CARD_RADIUS,
    padding: wp(3),
    overflow: 'hidden',
  },
  dropdownWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(2),
    borderRadius: wp(3),
    overflow: 'hidden',
    height: wp(12.13),
    backgroundColor: Colors.whiteOverlay18,
    paddingHorizontal: wp(3),
    gap: wp(2),
  },
  dropdownTextCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  subjectLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
  },
  selectedText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.15),
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.7),
    gap: wp(1.2),
  },
  classText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xxm,
    maxWidth: wp(16),
  },
});
