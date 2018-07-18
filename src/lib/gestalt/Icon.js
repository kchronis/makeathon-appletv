/**
 * WIP - Gestalt like Icon
 * https://github.com/pinterest/gestalt/tree/master/src/Icon
 * @flow
 */

import * as React from 'react';
import { View, Image } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Text from './Text';

import PIColor from '../styles/picolor';

// This is the list of icons we are currenlty supporting
/* eslint-disable global-require */
const icons = {
  'contacts-small-selected': require('../../screens/Playground/images/contacts-small-selected.png'),
};
/* eslint-enable global-require */

type IconProps = {
  accessibilityLabel: string,
  color?:
    | 'blue'
    | 'darkGray'
    // | 'eggplant' // Not supported in React Native
    | 'gray'
    | 'green'
    | 'lightGray'
    | 'maroon'
    | 'midnightblue'
    | 'navy'
    | 'olive'
    | 'orange'
    | 'orchid'
    // | 'pine' // Not supported in React Native
    | 'purple'
    | 'red'
    // | 'watermelon' // Not supported in React Native
    | 'white',
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
  * This allows us to type check for a valid icon name based on the keys from the list of
  * icons provided in gestalt-icon/icons/index.js.
  */
  icon: $Keys<typeof icons>,
  // inline?: boolean, // Not supported in React Native
  size?: number | string,

  style?: StyleObj, // React Native only: Should go away eventually
};

export default function Icon(props: IconProps) {
  const {
    accessibilityLabel,
    color = 'gray',
    icon,
    // inline,
    size = 16,
    style,
  } = props;

  const path = icons[icon];

  return (
    <Image
      accessibilityLabel={accessibilityLabel}
      source={path}
      style={[{ width: size, height: size, tintColor: color }, style]}
    />
  );
}
