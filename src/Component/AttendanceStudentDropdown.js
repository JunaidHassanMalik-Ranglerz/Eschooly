import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ChildSwitchModal from './Parent/ChildSwitchModal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonAvatar from './Profile/PersonAvatar';
import CardWave, {SCREEN_WAVES} from './CardWave';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from './Profile/ProfileTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import AnimatedCard from './AnimatedCard';

const AttendanceStudentDropdown = props => {
  const [open, setOpen] = React.useState(false);
  const students = props?.students || [];
  const readOnly =
    typeof props?.readOnly === 'boolean'
      ? props.readOnly
      : students.length <= 1;
  const premium = props?.premium !== false;
  const embedded = props?.embedded === true;
  const externalPicker = props?.externalPicker === true;
  const useModal =
    props?.useModal !== false &&
    !externalPicker &&
    !readOnly &&
    students.length > 1;
  const waveVariant = props?.waveVariant || SCREEN_WAVES.attendance;
  useEffect(() => {
    props?.onOpenChange?.(open);
  }, [open, props?.onOpenChange]);

  const setMenuOpen = next => {
    setOpen(next);
  };

  const handleSelect = useCallback(
    item => {
      props?.onSelect?.(item);
      setMenuOpen(false);
    },
    [props?.onSelect],
  );

  const selectedId = props?.selectedId;

  const classText =
    props?.student?.classInfo ||
    props?.student?.classLabel ||
    props?.student?.classBadge;

  const cardContent = (
    <>
      <PersonAvatar person={props?.student} size={wp(12)} />
      <View style={styles.info}>
        <Text style={styles.studentLabel} numberOfLines={1}>
          {props?.label || Strings.student}
        </Text>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {props?.student?.label}
          </Text>
          {!readOnly ? (
            <View
              style={{
                transform: [{rotate: open ? '180deg' : '0deg'}],
              }}>
              <Icon name="chevron-down" size={wp(4.5)} color={Colors.whiteMuted85} />
            </View>
          ) : null}
        </View>
        <Text style={styles.classText} numberOfLines={1}>
          {classText}
        </Text>
      </View>
    </>
  );

  const openPicker = () => {
    if (readOnly) {
      return;
    }
    if (externalPicker) {
      props?.onPickerPress?.();
      return;
    }
    setMenuOpen(true);
  };

  const shell = (
    <View
      style={[styles.wrap, embedded && styles.embeddedWrap]}
      collapsable={false}>
      <TouchableOpacity
        style={styles.cardPress}
        disabled={readOnly}
        activeOpacity={0.88}
        onPress={openPicker}>
        {premium ? (
          <LinearGradient
            colors={PROFILE_GRADIENT}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={[styles.card, IDENTITY_CARD_SHADOW]}>
            <CardWave variant={waveVariant} />
            <View style={styles.cardContent}>{cardContent}</View>
          </LinearGradient>
        ) : (
          <View style={styles.cardPlain}>{cardContent}</View>
        )}
      </TouchableOpacity>

      {useModal ? (
        <ChildSwitchModal
          visible={open}
          childrenList={students}
          selectedId={selectedId}
          onSelect={value => {
            const item = students.find(s => s.value === value);
            if (item) {
              handleSelect(item);
            }
          }}
          onClose={() => setMenuOpen(false)}
        />
      ) : null}
    </View>
  );

  if (props?.animationIndex != null) {
    return (
      <AnimatedCard index={props.animationIndex} style={styles.enterWrap}>
        {shell}
      </AnimatedCard>
    );
  }

  return shell;
};

export default AttendanceStudentDropdown;

const styles = StyleSheet.create({
  enterWrap: {
    width: '100%',
  },
  wrap: {
    width: '100%',
    marginBottom: hp(2),
    position: 'relative',
  },
  embeddedWrap: {
    marginBottom: hp(0.4),
  },
  cardPress: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  card: {
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    minHeight: hp(14),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  cardPlain: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF5FD',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#C0D5F2',
    padding: wp(4),
  },
  info: {
    flex: 1,
    marginLeft: wp(3),
  },
  studentLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginBottom: hp(0.2),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
  },
  classText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
});
