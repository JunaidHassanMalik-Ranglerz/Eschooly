import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp} from '../../Constants/Responsive';
import {getPersonImageSource} from '../../utils/getPersonImage';

const isValidImageSource = source => {
  if (source == null) {
    return false;
  }
  if (typeof source === 'number') {
    return true;
  }
  if (typeof source === 'object' && source.uri) {
    return String(source.uri).trim().length > 0;
  }
  return false;
};

const PersonAvatar = ({
  person,
  size = wp(15),
  variant = 'circle',
  borderColor,
  borderWidth = 0,
  fallbackToInitials = false,
  style,
  imageStyle,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const resolvedSource = useMemo(() => getPersonImageSource(person), [person]);

  useEffect(() => {
    setImageFailed(false);
  }, [person?.value, person?.label, person?.name, resolvedSource]);

  const source = useMemo(() => {
    if (imageFailed || !isValidImageSource(resolvedSource)) {
      return Images.threeDots;
    }
    return resolvedSource;
  }, [imageFailed, resolvedSource]);

  const radius =
    variant === 'identity'
      ? wp(3)
      : variant === 'circle'
        ? size / 2
        : wp(3);

  if (fallbackToInitials && !person?.gender && !person?.photoUrl && !person?.photo) {
    return (
      <View
        style={[
          styles.initialsWrap,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderColor: borderColor || Colors.transparent,
            borderWidth,
          },
          style,
        ]}>
        <Text style={[styles.initials, {fontSize: size * 0.34}]}>
          {person?.initials}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: variant === 'identity' ? size * 1.22 : size,
          borderRadius: radius,
          borderColor: borderColor || Colors.transparent,
          borderWidth,
        },
        style,
      ]}>
      <Image
        source={source}
        style={[
          styles.image,
          {
            width: size,
            height: variant === 'identity' ? size * 1.22 : size,
            borderRadius: radius,
          },
          imageStyle,
        ]}
        resizeMode="cover"
        onError={() => setImageFailed(true)}
      />
    </View>
  );
};

export default PersonAvatar;

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: Colors.lightGray,
  },
  image: {
    backgroundColor: Colors.lightGray,
  },
  initialsWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay22,
  },
  initials: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
});
