/**
 * PIColor
 * Colors defined for Pinterest
 *
 * @flow
 */

import { NativeModules } from 'react-native';

export type Color = string | number;

// Color passed in from native
type PIReactNativeModuleColorType = { [string]: string };
const PIReactNativeColor = (NativeModules.PIReactNativeColor: PIReactNativeModuleColorType);

// Color defined at React Native. Eventually they should move to the native side too
const transparentColor = 'transparent';
const blueColor = '#0084ff';
const darkGrayColor = '#555';
const redColor = '#bd081c';
const lightGrayColor = '#efefef';
const whiteColor = '#fff';
const orangeColor = '#e3780c';

const PIColor = {
  clearColor: "#00000000",
  primaryBackgroundColor: "white",
  pinterestDarkGrayColor: "#555555",
  pinterestLightGrayColor: "#B5B5B5",
  pinterestSuperLightGrayColor: "#EFEFEF",
  pinterestRedColor: "#BD081C",
  elephantPinBackgroundColor: "#f5f5f5",

  transparentColor,
  blueColor,
  darkGrayColor,
  redColor,
  lightGrayColor,
  whiteColor,
  orangeColor,
};

const gestaltColorToColor = {
  clear: PIColor.clearColor,
  primaryBackground: PIColor.primaryBackgroundColor,
  darkGray: PIColor.pinterestDarkGrayColor,
  lightGray: PIColor.pinterestLightGrayColor,
  superLightGray: PIColor.pinterestSuperLightGrayColor,
  red: PIColor.pinterestRedColor,
  white: PIColor.whiteColor,
  elephantPinBackground: PIColor.elephantPinBackgroundColor,
  orange: PIColor.orangeColor,
};

export { gestaltColorToColor };
export default PIColor;
