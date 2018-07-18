/**
 * WIP - Gestalt like Button
 * https://github.com/pinterest/gestalt/tree/master/src/Button
 * @flow
 */

import * as React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
// https://github.com/facebook/react-native/issues/15955
import type { NativeMethodsMixinType } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

import Color from 'color';

import Text from './Text';

import PIColor from '../styles/picolor';

// Base Colors

type Props = {|
  // accessibilityExpanded?: boolean,
  // accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white' | 'darkGray',
  disabled?: boolean,
  onPress?: (event: SyntheticEvent<>) => void,
  // onClick?: (event: SyntheticEvent) => void, // Not supported by RN
  size?: 'sm' | 'md' | 'lg' | 'xl',
  text: string,
  // type?: 'submit' | 'button', // Not supported by RN

  style?: StyleObj, // React Native only: Should go away eventually
|};

// Available text colors for the Button
const textColor = {
  blue: 'white',
  gray: 'darkGray',
  red: 'white',
  transparent: 'white',
  white: 'darkGray',
  darkGray: 'white',
};

const backgroundColor: { [string]: string } = {
  gray: PIColor.lightGrayColor,
  red: PIColor.redColor,
  blue: PIColor.blueColor,
  transparent: PIColor.transparentColor,
  white: PIColor.whiteColor,
  darkGray: PIColor.darkGrayColor,
};

const underlyingColorForColor: { [string]: string } = {
  gray: Color(PIColor.lightGrayColor)
    .blacken(0.6)
    .hex(),
  red: Color(PIColor.redColor)
    .blacken(0.6)
    .hex(),
  blue: Color(PIColor.blueColor)
    .blacken(0.6)
    .hex(),
  white: Color(PIColor.whiteColor)
    .blacken(0.6)
    .hex(),
  transparent: Color(PIColor.darkGrayColor)
    .blacken(0.6)
    .hex(),
  darkGray: Color(PIColor.darkGrayColor)
    .blacken(0.6)
    .hex(),
};

const textSizeForSize = {
  sm: 'smText',
  md: 'mdText',
  lg: 'lgText',
  xl: 'xlText',
};

const paddingForSize = {
  sm: { paddingVertical: 10, paddingHorizontal: 14 },
  md: { paddingVertical: 11, paddingHorizontal: 14 },
  lg: { padding: 14 },
  xl: { padding: 22 },
};

export default class Button extends React.Component<Props> {
  _root: ?NativeMethodsMixinType;

  // This dance needs to be done to be able to be wrapped in a TouchableHighlight
  // without having a UIView wrapper
  setNativeProps(nativeProps: Object) {
    if (this._root) {
      this._root.setNativeProps(nativeProps);
    }
  }

  render() {
    const {
      // accessibilityExpanded,
      // accessibilityHaspopup,
      accessibilityLabel,
      color = 'gray',
      disabled = false,
      // inline = false,
      onPress,
      size = 'md',
      text,
      // type = 'button',
      style,
    } = this.props;

    /* eslint-disable no-return-assign */
    return (
      <TouchableHighlight
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={[
          styles.container,
          paddingForSize[size],
          {
            backgroundColor: backgroundColor[color],
          },
          style,
        ]}
        underlayColor={underlyingColorForColor[color]}
      >
        <View ref={root => (this._root = root)}>
          <Text
            align="center"
            bold
            color={disabled ? 'lightGray' : textColor[color]}
            size={textSizeForSize[size]}
          >
            {text}
          </Text>
        </View>
      </TouchableHighlight>
    );
    /* eslint-enable no-return-assign */
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
