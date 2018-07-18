/**
 * WIP - Gestalt like Spinner
 * https://github.com/pinterest/gestalt/tree/master/src/Spinner
 * @flow
 */

import * as React from 'react';
import { View, requireNativeComponent } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Text from './Text';

import PIColor from '../styles/picolor';

const ReactNativeIndeterminateActivityIndicatorView = requireNativeComponent(
  'PIReactNativeIndeterminateActivityIndicatorView',
  null
);

const SIZE = 64;

type Props = {|
  accessibilityLabel: string,
  show: boolean,

  style?: StyleObj, // React Native only: Should go away eventually
|};

export default function Spinner({ accessibilityLabel, show, style }: Props) {
  return (
    <ReactNativeIndeterminateActivityIndicatorView
      accessibilityLabel={accessibilityLabel}
      show={show}
      style={[{ width: SIZE, height: SIZE }, style]}
    />
  );
}

// Playground support

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../screens/Playground/Playground';

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define('Spinner Default', () => (
    <View
      style={{
        backgroundColor: PIColor.primaryBackgroundColor,
        flex: 1,
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <Text style={{ paddingBottom: 5 }}>Spinner:</Text>
      <Spinner
        accessibilityLabel={'Label Haha'}
        show
        style={{ alignSelf: 'center' }}
      />
    </View>
  ));
};
