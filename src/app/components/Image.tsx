import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType, ViewStyle, ImageStyle } from 'react-native';

interface ImageProps {
  source: ImageSourcePropType;  // Can be a string URL or a local require('./path')
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center'; // Optional prop for resizeMode
  style?: ImageStyle; // Optional style prop to customize the image
  width : number;
  height : number;
  containerStyle?: ViewStyle;

}

const CustomImage: React.FC<ImageProps> = ({ source, resizeMode = 'cover', style, width, height, containerStyle }) => {
  return (
    <View style={[styles.container, { width : width , height : height , borderRadius : 100, }, containerStyle]}>
      <Image source={source} resizeMode={resizeMode} style={[{ width : width , height : height , borderRadius : 100} , style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

export default CustomImage;
