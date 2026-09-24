import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import DepthIcon from '../DepthIcon';

import AnimatedCard from '../AnimatedCard';

import CardWave from '../CardWave';

import {Colors} from '../../Constants/Colors';

import {Fonts} from '../../Constants/Fonts';

import {Fontsize} from '../../Constants/Fontsize';

import {wp, hp} from '../../Constants/Responsive';



const ScheduleItem = ({

  item,

  onPress,

  cardBg,

  gradientColors,

  animationIndex = 0,

  entering,

  waveVariant = 'scheduleTimetable',

}) => {

  const dark = Boolean(cardBg || gradientColors);



  const content = (

    <>

      <View style={styles.iconWrap}>

        <DepthIcon

          name={item.icon}

          size={wp(6.5)}

          color={item.iconColor || Colors.iconSky}

        />

      </View>

      <View style={styles.info}>

        <Text

          style={[styles.subject, dark && styles.subjectDark]}

          numberOfLines={1}>

          {item.subject}

        </Text>

        <Text style={[styles.time, dark && styles.timeDark]} numberOfLines={1}>

          {item.time}

        </Text>

      </View>

    </>

  );



  const inner = gradientColors ? (

    <LinearGradient

      colors={gradientColors}

      start={{x: 0, y: 0}}

      end={{x: 1, y: 1}}

      style={styles.rowInner}>

      <CardWave variant={waveVariant} />

      {content}

    </LinearGradient>

  ) : (

    <View style={[styles.rowInner, cardBg ? {backgroundColor: cardBg} : null]}>

      <CardWave variant={waveVariant} />

      {content}

    </View>

  );



  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.88}
        delayPressIn={0}
        onPress={onPress}
        disabled={!onPress}
        style={styles.cardFill}>
        {inner}
      </TouchableOpacity>
    </AnimatedCard>
  );
};



export default ScheduleItem;



const styles = StyleSheet.create({

  row: {

    borderRadius: wp(4),

    marginBottom: hp(1.2),

  },

  cardFill: {

    borderRadius: wp(4),

    overflow: 'hidden',

  },

  rowInner: {

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: wp(3.5),

    paddingVertical: hp(1.5),

    overflow: 'hidden',

    position: 'relative',

  },

  iconWrap: {

    width: wp(11),

    height: wp(11),

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: wp(3),

    zIndex: 1,

  },

  info: {

    flex: 1,

    zIndex: 1,

  },

  subject: {

    color: Colors.black,

    fontFamily: Fonts.semibold,

    fontSize: Fontsize.xs5,

    marginBottom: hp(0.3),

  },

  subjectDark: {

    color: Colors.white,

  },

  time: {

    color: Colors.grayText,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.xs1,

  },

  timeDark: {

    color: Colors.whiteMuted75,

  },

});

