import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';

const parseHex = hex => {
  if (!hex || hex[0] !== '#') {
    return {r: 0, g: 0, b: 0};
  }
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map(part => part + part)
          .join('')
      : raw;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
};

const toRgb = ({r, g, b}) =>
  `rgb(${Math.max(0, Math.min(255, Math.round(r)))},${Math.max(
    0,
    Math.min(255, Math.round(g)),
  )},${Math.max(0, Math.min(255, Math.round(b)))})`;

const shade = (hex, factor) => {
  const {r, g, b} = parseHex(hex);
  return toRgb({r: r * factor, g: g * factor, b: b * factor});
};

const toFilledIcon = name => {
  if (!name) {
    return name;
  }
  return name.replace('-outline', '').replace('-sharp', '');
};

const DepthIcon = ({name, source, text, size, color}) => {
  const iconName = toFilledIcon(name);
  const offset = Math.max(2, Math.round(size * 0.08));

  const renderGlyph = (layerColor, dx, dy) => {
    const pos = {
      position: 'absolute',
      top: dy,
      left: dx,
    };

    if (text) {
      return (
        <Text
          style={[
            styles.text,
            pos,
            {fontSize: size * 0.72, color: layerColor, lineHeight: size},
          ]}>
          {text}
        </Text>
      );
    }

    if (source) {
      return (
        <Image
          source={source}
          resizeMode="contain"
          style={[pos, styles.image, {width: size, height: size, tintColor: layerColor}]}
        />
      );
    }

    return (
      <View style={pos}>
        <Icon name={iconName} size={size} color={layerColor} />
      </View>
    );
  };

  return (
    <View style={[styles.wrap, {width: size, height: size}]}>
      {renderGlyph(shade(color, 0.35), offset, offset)}
      {renderGlyph(color, 0, 0)}
    </View>
  );
};

export default DepthIcon;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.transparent,
    overflow: 'visible',
  },
  image: {
    backgroundColor: Colors.transparent,
  },
  text: {
    fontFamily: Fonts.bold,
    backgroundColor: Colors.transparent,
  },
});
