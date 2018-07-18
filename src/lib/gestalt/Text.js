/**
 * WIP - Gestalt like Text
 * https://github.com/pinterest/gestalt/blob/master/src/Text/
 * @flow
 *
 * We are using explicitly a class component to be able to get the native Props
 * callback and pass them through. Otherwise it would not be possible to wrap
 * the Text into any Touchable: https://facebook.github.io/react-native/docs/direct-manipulation.html
 *
 */

import * as React from 'react';
import { Text as ReactText, View, StyleSheet } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
// https://github.com/facebook/react-native/issues/15955
import type { NativeMethodsMixinType } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

import PIColor, { gestaltColorToColor } from '../styles/picolor';
import PIText from '../styles/pitext';
import { isSmallPhoneDevice } from '../Utils';

const textSizeToPITextSize = {
  xsText: PIText.textExtraSmallFontSize,
  smText: PIText.textSmallFontSize,
  mdText: PIText.textMediumFontSize,
  lgText: PIText.textLargeFontSize,
  xlText: PIText.textExtraLargeFontSize,
  xsDisplay: PIText.displayExtraSmallFontSize,
  smDisplay: PIText.displayExtraSmallFontSize,
  mdDisplay: PIText.displayMediumFontSize,
  lgDisplay: PIText.displayLargeFontSize,
  xlDisplay: PIText.displayExtraLargeFontSize,
};

const textSmallPhoneSizeToPITextSize = {
  xsText: PIText.textSmallPhoneExtraSmallFontSize,
  smText: PIText.textSmallPhoneSmallFontSize,
  mdText: PIText.textSmallPhoneMediumFontSize,
  lgText: PIText.textSmallPhoneLargeFontSize,
  xlText: PIText.textSmallPhoneExtraLargeFontSize,
  xsDisplay: PIText.displaySmallPhoneExtraSmallFontSize,
  smDisplay: PIText.displaySmallPhoneExtraSmallFontSize,
  mdDisplay: PIText.displaySmallPhoneMediumFontSize,
  lgDisplay: PIText.displaySmallPhoneLargeFontSize,
  xlDisplay: PIText.displaySmallPhoneExtraLargeFontSize,
};

const getTextSizeToPITextSize = (textSize: string) =>
  isSmallPhoneDevice()
    ? textSmallPhoneSizeToPITextSize[textSize]
    : textSizeToPITextSize[textSize];

type Props = {|
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  children?: React.Node,
  color?:
    | 'clear'
    | 'primaryBackground'
    | 'darkGray'
    | 'lightGray'
    | 'superLightGray'
    | 'red'
    | 'elephantPinBackground'
    | 'white',
  italic?: boolean,
  size?:
    | 'xsText'
    | 'smText'
    | 'mdText'
    | 'lgText'
    | 'xlText'
    | 'xsDisplay'
    | 'smDisplay'
    | 'mdDisplay'
    | 'lgDisplay'
    | 'xlDisplay',
  accessible?: boolean,
  testID?: string,
  onPress?: () => void,
  onLongPress?: () => void,
  suppressHighlighting?: boolean,

  style?: StyleObj, // React Native only: Should go away eventually
|};

export default class Text extends React.PureComponent<Props> {
  _root: ?NativeMethodsMixinType;

  setNativeProps(nativeProps: Object) {
    if (this._root) {
      this._root.setNativeProps(nativeProps);
    }
  }

  render() {
    const {
      align = 'left',
      bold = false,
      children,
      color = 'darkGray',
      italic = false,
      size = 'mdText',

      accessible = true, // React Native only
      testID, // React Native only
      onPress, // React Native only
      onLongPress, // React Native only
      suppressHighlighting, // React Native only

      style, // React Native only
    } = this.props;
    const textStyles = {
      textAlign: align,
      fontFamily: PIText.defaultFont,
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italic ? 'italic' : 'normal',
      fontSize: getTextSizeToPITextSize(size),
      color: gestaltColorToColor[color],
    };
    /* eslint-disable no-return-assign */
    return (
      <ReactText
        ref={root => (this._root = root)}
        style={StyleSheet.flatten([textStyles, style])}
        accessible={accessible}
        testID={testID}
        onPress={onPress}
        onLongPress={onLongPress}
        suppressHighlighting={suppressHighlighting}
      >
        {children}
      </ReactText>
    );
    /* eslint-enable no-return-assign */
  }
}
