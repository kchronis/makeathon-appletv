/**
 * SevenSwitch.js
 * @flow
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { processColor, Switch, ViewPropTypes } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import PIColor, { type Color } from '../styles/picolor';

const ColorPropType = require('ColorPropType');

type Props = {|
  on: boolean,
  disabled: boolean,
  inactiveColor: ?Color, // Not available for Android
  activeColor?: ?Color | null, // Not available for Android
  tintColor: ?Color,
  onTintColor: ?Color,
  borderColor: ?Color, // Not available for Android
  thumbTintColor: ?Color,
  onThumbTintColor?: ?Color | null, // Not available for Android
  shadowColor: ?Color, // Not available for Android
  onValueChange: (value: boolean) => void,
  style?: StyleObj,
|};

export default class SevenSwitch extends React.Component<Props> {
  static defaultProps = {
    disabled: false,
    inactiveColor: processColor(PIColor.pinterestLightGrayColor),
    tintColor: processColor(PIColor.pinterestLightGrayColor),
    onTintColor: processColor(PIColor.pinterestRedColor),
    borderColor: processColor(PIColor.pinterestLightGrayColor),
    thumbTintColor: processColor(PIColor.primaryBackgroundColor),
    shadowColor: processColor(PIColor.clearColor),
  };

  // Currently eslint does not detect that props are used via the spread
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    on: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    inactiveColor: ColorPropType,
    activeColor: ColorPropType,
    tintColor: ColorPropType,
    onTintColor: ColorPropType,
    borderColor: ColorPropType,
    thumbTintColor: ColorPropType,
    onThumbTintColor: ColorPropType,
    shadowColor: ColorPropType,
    onValueChange: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
  };
  /* eslint-enable react/no-unused-prop-types */

  render() {
    return <Switch {...this.props} value={this.props.on} />;
  }
}
