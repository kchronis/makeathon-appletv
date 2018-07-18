/**
 * WIP - Gestalt like Heading
 * https://github.com/pinterest/gestalt/tree/master/src/Heading
 * @flow
 */

import * as React from 'react';
import { View, StyleSheet, Text as ReactText } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import PIColor, { gestaltColorToColor } from '../styles/picolor';
import PIText from '../styles/pitext';
import { isSmallPhoneDevice } from '../Utils';

const headingSizeToPITextSize = {
  xs: PIText.displayExtraSmallFontSize,
  sm: PIText.displaySmallFontSize,
  md: PIText.displayMediumFontSize,
  lg: PIText.displayLargeFontSize,
  xl: PIText.displayExtraLargeFontSize,
};

const headingSmallPhoneSizeToPITextSize = {
  xs: PIText.displaySmallPhoneExtraSmallFontSize,
  sm: PIText.displaySmallPhoneSmallFontSize,
  md: PIText.displaySmallPhoneMediumFontSize,
  lg: PIText.displaySmallPhoneLargeFontSize,
  xl: PIText.displaySmallPhoneExtraLargeFontSize,
};

const getHeadingSizeToPITextSize = (textSize: string) =>
  isSmallPhoneDevice
    ? headingSmallPhoneSizeToPITextSize[textSize]
    : headingSizeToPITextSize[textSize];

type Props = {|
  // accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6, // Not available in RN
  children?: any,
  color?:
    | 'primaryBackground'
    | 'darkGray'
    | 'lightGray'
    | 'superLightGray'
    | 'red'
    | 'elephantPinBackground'
    | 'white',
  // id?: string, // Not available in RN
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: boolean,

  style?: StyleObj, // React Native only: Should go away eventually
|};

export default function Heading(props: Props) {
  const {
    // accessibilityLevel,
    children,
    color = 'darkGray',
    // id = null,
    size,
    truncate = false,
    style,
  } = props;

  const headingStyles = {
    color: gestaltColorToColor[color],
    fontSize: getHeadingSizeToPITextSize(size),
    fontFamily: PIText.defaultFont,
    fontWeight: 'bold',
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'center',
  };

  return (
    <ReactText
      style={StyleSheet.flatten([headingStyles, style])}
      numberOfLines={truncate ? 1 : 0}
    >
      {children}
    </ReactText>
  );
}

// Playground support

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../screens/Playground/Playground';

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define('Default Heading', () => (
    <View
      style={{
        backgroundColor: PIColor.primaryBackgroundColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}
    >
      <Heading size={'md'} style={{ textAlign: 'center' }}>
        Medium heading in default color
      </Heading>
    </View>
  ));
  define('Small Truncated Heading', () => (
    <View
      style={{
        backgroundColor: PIColor.primaryBackgroundColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}
    >
      <Heading size={'sm'} truncate>
        Small truncated heading text text text text
      </Heading>
    </View>
  ));
};
