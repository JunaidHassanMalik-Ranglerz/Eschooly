import React from 'react';
import {Image} from 'react-native';
import {wp} from '../../Constants/Responsive';

const FeatureArtImage = ({source, size = wp(12), width, height, style}) => {
  if (!source) {
    return null;
  }

  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[{width: width || size, height: height || size}, style]}
    />
  );
};

export default FeatureArtImage;
