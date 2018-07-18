/**
 * WIP - Gestalt like TextField
 * https://github.com/pinterest/gestalt/blob/master/src/TextField/
 * @flow
 */

import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import PIColor from '../styles/picolor';
import PIText from '../styles/pitext';
import { isSmallPhoneDevice } from '../Utils';

type Props = {|
  // errorMessage?: string,
  // hasError?: boolean,
  // id: string,
  // idealErrorDirection?: 'up' | 'right' | 'down' | 'left' /* default: right */,
  onBlur?: (value: string) => void,
  onChange: (value: string) => void,
  onFocus?: (value: string) => void,
  onSubmitEditing?: () => void,
  placeholder?: string,
  // type?: 'date' | 'email' | 'number' | 'password' | 'text' | 'url',
  type?: 'password' | 'text',
  value?: string,
  autoCapitalize?: 'none' | 'sentences' | 'word' | 'characters',

  style?: StyleObj, // React Native only: Should go away eventually
|};

export default class TextField extends React.Component<Props> {
  static defaultProps = {
    // hasError: false,
    // idealErrorDirection: 'right',
    type: 'text',
    autoCapitalize: 'sentences',
  };

  handleChange = (event: { nativeEvent: { text: string } }) => {
    this.props.onChange(event.nativeEvent.text);
  };

  handleBlur = (event: { nativeEvent: { text: string } }) => {
    if (this.props.onBlur) {
      this.props.onBlur(event.nativeEvent.text);
    }
  };

  handleFocus = (event: { nativeEvent: { text: string } }) => {
    if (this.props.onFocus) {
      this.props.onFocus(event.nativeEvent.text);
    }
  };

  handleSubmitEditing = () => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing();
    }
  };

  render() {
    const {
      // errorMessage,
      // hasError,
      // id,
      // idealErrorDirection,
      placeholder,
      type,
      value,
      style,
      autoCapitalize,
    } = this.props;

    return (
      <TextInput
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        placeholder={placeholder}
        placeholderTextColor={PIColor.pinterestLightGrayColor}
        value={value}
        secureTextEntry={type === 'password'}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={this.handleSubmitEditing}
        style={[styles.textField, style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    fontWeight: PIText.boldFontWeight,
    fontSize: isSmallPhoneDevice()
      ? PIText.textSmallPhoneLargeFontSize
      : PIText.textLargeFontSize,
    color: PIColor.pinterestDarkGrayColor,
    backgroundColor: PIColor.pinterestSuperLightGrayColor,
    borderRadius: 4,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});

// Playground support

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../screens/Playground/Playground';

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define('TextField with placeholder', () => (
    <View
      style={{
        padding: 10,
        backgroundColor: PIColor.primaryBackgroundColor,
      }}
    >
      <TextField
        placeholder={'TextField with placeholder'}
        onChange={(text: string) => {
          // eslint-disable-next-line no-console
          console.log(text);
        }}
      />
    </View>
  ));
  define('Password TextField with placeholder', () => (
    <View
      style={{
        padding: 10,
        backgroundColor: PIColor.primaryBackgroundColor,
      }}
    >
      <TextField
        type={'password'}
        placeholder={'Password TextField with placeholder'}
        onChange={(text: string) => {
          // eslint-disable-next-line no-console
          console.log(text);
        }}
      />
    </View>
  ));
};
