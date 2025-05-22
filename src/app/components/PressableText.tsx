import React from "react";


import { StyleSheet, TextStyle, ViewStyle, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface PressableTextProps extends TouchableOpacityProps {
  children: React.ReactNode;  
  style?: ViewStyle;        
  textStyle?: TextStyle;   
  fontFamily? : 'regular' | 'medium' | 'semiBold'
}

const PressableText: React.FC<PressableTextProps> = ({ 
  children, 
  style, 
  textStyle, 
  fontFamily,
  ...rest 
}) => {
  return (
    <TouchableOpacity style={style} {...rest}>
      <Text  style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

});

export default PressableText;
