import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';

import DepthIcon from './DepthIcon';

import AnimatedCard from './AnimatedCard';

import CardWave, {SCREEN_WAVES} from './CardWave';

import {Colors} from '../Constants/Colors';

import {Fonts} from '../Constants/Fonts';

import {Fontsize} from '../Constants/Fontsize';

import {wp, hp} from '../Constants/Responsive';



const CARD_GRADIENT = ['#07346B', '#062653', '#0D5CA8'];



const NotificationCard = ({item, animationIndex = 0, entering}) => {

  const accent = item.iconColor || Colors.iconSky;

  const isUnread = !!item.unread;



  return (

    <AnimatedCard
      index={animationIndex}
      entering={entering}
      style={styles.wrap}>
      <View style={[styles.clip, isUnread && styles.wrapUnread]}>
      <LinearGradient

        colors={CARD_GRADIENT}

        locations={[0, 0.5, 1]}

        start={{x: 0, y: 0.5}}

        end={{x: 1, y: 0.5}}

        style={styles.face}>

        <CardWave variant={SCREEN_WAVES.notifications} />



        {isUnread ? <View style={styles.unreadDot} pointerEvents="none" /> : null}



        <View style={styles.iconSlot}>

          <DepthIcon name={item.icon} size={wp(6.8)} color={accent} />

        </View>



        <View style={styles.body}>

          <Text style={styles.title} numberOfLines={2}>

            {item.title}

          </Text>

          <Text style={styles.message} numberOfLines={4}>

            {item.message}

          </Text>

          <View style={styles.metaRow}>

            <Icon name="time-outline" size={wp(3.5)} color="#B9CEF0" />

            <Text style={styles.meta}>

              {item.date ? `${item.date}  ·  ${item.time}` : item.time}

            </Text>

            {isUnread ? <Text style={styles.unreadLabel}>New</Text> : null}

          </View>

        </View>

      </LinearGradient>
      </View>

    </AnimatedCard>

  );

};



export default NotificationCard;



const styles = StyleSheet.create({

  wrap: {

    marginBottom: hp(1.6),

  },

  clip: {

    borderRadius: 18,

    overflow: 'hidden',

    elevation: 5,

    shadowColor: '#0A4E8A',

    shadowOffset: {width: 0, height: 4},

    shadowOpacity: 0.25,

    shadowRadius: 8,

  },

  wrapUnread: {

    borderWidth: 1,

    borderColor: 'rgba(125, 211, 252, 0.55)',

  },

  face: {

    flexDirection: 'row',

    alignItems: 'flex-start',

    borderRadius: 18,

    borderWidth: 1,

    borderColor: '#65C4FF',

    paddingHorizontal: wp(4.2),

    paddingVertical: hp(2),

    overflow: 'hidden',

  },

  unreadDot: {

    position: 'absolute',

    top: hp(1.4),

    right: wp(3.5),

    width: wp(2.2),

    height: wp(2.2),

    borderRadius: wp(1.1),

    backgroundColor: '#7DD3FC',

    zIndex: 2,

  },

  iconSlot: {

    width: wp(11),

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: wp(3),

    marginTop: hp(0.2),

    zIndex: 1,

  },

  body: {

    flex: 1,

    minWidth: 0,

    zIndex: 1,

  },

  title: {

    color: '#FFFFFF',

    fontFamily: Fonts.bold,

    fontSize: Fontsize.sm,

    fontWeight: '700',

    includeFontPadding: false,

  },

  message: {

    color: '#AFC7ED',

    fontFamily: Fonts.regular,

    fontSize: Fontsize.xs1,

    lineHeight: wp(4.6),

    marginTop: hp(0.55),

    includeFontPadding: false,

  },

  metaRow: {

    flexDirection: 'row',

    alignItems: 'center',

    marginTop: hp(1.1),

    flexWrap: 'wrap',

    gap: wp(2),

  },

  meta: {

    color: '#B9CEF0',

    fontFamily: Fonts.medium,

    fontSize: Fontsize.xxm,

    marginLeft: wp(1.2),

    includeFontPadding: false,

  },

  unreadLabel: {

    color: '#BFDBFE',

    fontFamily: Fonts.semibold,

    fontSize: Fontsize.xxm,

    includeFontPadding: false,

  },

});

