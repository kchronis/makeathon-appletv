/**
 * WIP - Gestalt like Switch
 * https://github.com/pinterest/gestalt/tree/master/src/Switch
 * @flow
 */
import * as React from 'react';
import { View } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Text from './Text';
import SevenSwitch from '../../lib/react-native-seven-switch';

import PIColor from '../styles/picolor';

export default class Switch extends React.Component<
  {|
    disabled?: boolean,
    // id: string,
    // name?: string,
    onChange: (value: boolean) => void,
    switched: boolean,

    style?: StyleObj, // React Native only: Should go away eventually
  |},
  {
    focused: boolean,
  }
> {
  static defaultProps = {
    disabled: false,
    switched: false,
  };

  state = {
    focused: false,
  };

  render() {
    const { disabled, onChange, switched, style } = this.props;
    return (
      <SevenSwitch
        onValueChange={onChange}
        style={style}
        on={switched}
        disabled={disabled}
      />
    );
  }
}

// Playground support

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../screens/Playground/Playground';

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define('Enabled Switch', () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: PIColor.primaryBackgroundColor,
        padding: 10,
      }}
    >
      <Text
        size={'lgText'}
        bold
        style={{
          alignSelf: 'center',
          paddingRight: 10,
          flexGrow: 1,
          flexShrink: 1,
        }}
      >
        Default Switch:
      </Text>
      <Switch onChange={() => {}} />
    </View>
  ));

  define('Disabled Switch', () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: PIColor.primaryBackgroundColor,
        padding: 10,
      }}
    >
      <Text
        size={'lgText'}
        bold
        style={{
          alignSelf: 'center',
          paddingRight: 10,
          flexGrow: 1,
          flexShrink: 1,
        }}
      >
        Disabled Switched Switch:
      </Text>
      <Switch disabled switched onChange={() => {}} />
    </View>
  ));
};
