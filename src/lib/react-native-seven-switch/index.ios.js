/**
 * SevenSwitch.js
 * @flow
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  processColor,
  ViewPropTypes,
} from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import PIColor, { type Color } from '../styles/picolor';

const ColorPropType = require('ColorPropType');

type Props = {|
  on: boolean,
  disabled: boolean,
  inactiveColor: ?Color,
  activeColor?: ?Color,
  tintColor: ?Color | null,
  onTintColor: ?Color,
  borderColor: ?Color,
  thumbTintColor: ?Color,
  onThumbTintColor?: ?Color | null,
  shadowColor: ?Color,
  onValueChange: (value: boolean) => void,
  style?: StyleObj,
|};

type NativeEvent = {
  value: boolean,
};

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
    const style = [
      this.props.style,
      {
        // We define the width and height in here for now. We can move this
        // also to a prop in the future
        width: 40,
        height: 24,
      },
    ];
    return (
      <ReactNativeSevenSwitch
        {...this.props}
        style={style}
        onChange={this._onChange}
      />
    );
  }

  _onChange = (event: SyntheticEvent<> & { nativeEvent: NativeEvent }) => {
    if (!this.props.onValueChange) {
      return;
    }

    this.props.onValueChange(event.nativeEvent.value);
  };
}

const ReactNativeSevenSwitch = requireNativeComponent(
  'PIReactNativeSevenSwitch',
  SevenSwitch,
  {
    nativeOnly: { onChange: true },
  }
);
