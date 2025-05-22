import React, { useState } from "react";
import { KeyboardTypeOptions, View, StyleSheet, TextInput, TextInputProps, TextStyle , Text} from "react-native";
import colors from "../../constants/colors";
import { ViewStyle } from "react-native";


// Extend TextInputProps to include the additional props for your component
interface TextInputComponentProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  textColor?: string;
  labelText: string;
  style?: ViewStyle;
  secureTextEntry?: boolean;
  inputStyle? : ViewStyle | TextStyle
  maxLength?: number; 
  important? : boolean
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  textColor,
  labelText,
  style,
  secureTextEntry,
  inputStyle,
  maxLength = 20, // Default maxLength set to 20
  important = false,
  ...rest // This will gather any additional TextInput props
}) => {
  // 
  const [isFocused, setIsFocused] = useState(false)
  const [isError, setIsError] = useState(false)
  const star = <Text style={{color : colors.error.error500}}>*</Text>
  return (
    <View style={[styles.container, style]}>
         <View style={styles.labelWrapper}>
        <Text style={styles.label}>{labelText}{important &&star}</Text>
        {/* Character count next to the label */}
        <Text  style={styles.characterCount}>{`${value.length}/${maxLength}`}</Text>
      </View>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: isError 
          ? colors.error.error500
          : isFocused 
            ? colors.neutral.Neutral700 
            : colors.neutral.Neutral500,}, inputStyle]} // Set text color if provided
        placeholder={placeholder}
        placeholderTextColor={colors.neutral.Neutral500}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        onFocus={()=>setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
        {...rest} // Spread additional props here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 71,
    marginBottom: 24
  },
  input: {
    height: 48,
    
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.neutral.Neutral100,
    fontFamily: 'WorkSans',
  },
  label: {
    fontSize: 16,
    margin: 1,
    fontFamily: 'WorkSans',
  },
  labelWrapper: {
    flexDirection: 'row', // Align label and count horizontally
    justifyContent: 'space-between', // Ensure count is on the right side
    alignItems: 'center', // Vertically center the text and count
    marginBottom: 8, // Adjust spacing between label and input if necessary
  },
  characterCount: {
    fontSize: 14,
    color: '#999',
  },
});

export default TextInputComponent;
