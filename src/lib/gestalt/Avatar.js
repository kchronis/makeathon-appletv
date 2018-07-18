/**
 * WIP - Gestalt like Avatar
 * https://github.com/pinterest/gestalt/tree/master/src/Avatar
 * @flow
 *
 * TODOs:
 * - Use React Native Gestalt Images
 * - Better relayout handling for rounding
 * - Check in Default Avatar if style is passed in
 */

import * as React from 'react';
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import PIColor from '../styles/picolor';

import type { LayoutEvent } from './CoreEventTypes';

// Default Avatar

type DefaultAvatarProps = {
  name: string,

  style?: StyleObj, // React Native only: Should go away eventually
};

type DefaultAvatarState = {
  width: number,
  height: number,
};

class DefaultAvatar extends React.Component<
  DefaultAvatarProps,
  DefaultAvatarState
> {
  static defaultProps = {
    width: 100,
    height: 100,
  };

  constructor(props: DefaultAvatarProps) {
    super(props);

    // TODO: Check if style.height / style.width was passed in as props

    // Initial state
    this.state = {
      height: 0,
      width: 0,
    };
  }

  _onLayout = (event: LayoutEvent) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      width,
      height,
    });
  };

  render() {
    const { name, style } = this.props;
    const { width, height } = this.state;

    // For now we add a scaling of 50% of width of component
    const fontSize = width * 0.5;

    const firstInitial = [...name][0].toUpperCase();
    return (
      <View
        onLayout={this._onLayout}
        style={[
          {
            borderRadius: height / 2.0,
            flex: 1,
            backgroundColor: PIColor.pinterestLightGrayColor,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Text
          style={{
            fontSize,
            color: '#FFFFFF',
            fontWeight: 'bold',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}
        >
          {firstInitial}
        </Text>
      </View>
    );
  }
}

// Avatar

type AvatarProps = {|
  name: string,
  size?: 'sm' | 'md' | 'lg',
  src?: string,
  // verified?: boolean, // TODO: Add support for verified
|};

type AvatarState = {|
  width: number,
  height: number,
|};

const sizes = {
  sm: 24,
  md: 40,
  lg: 72,
};

// eslint-disable-next-line react/no-multi-comp
export default class Avatar extends React.Component<AvatarProps, AvatarState> {
  constructor() {
    super();

    this.state = {
      width: -1,
      height: -1,
    };
  }

  _onLayout = (event: LayoutEvent) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      width,
      height,
    });
  };

  render() {
    const { name, src, size } = this.props;

    let borderRadius = 0;
    let width = size ? sizes[size] : '100%';
    let height = size ? sizes[size] : '100%';

    // After the re-layout and we know the definitive width and height we
    // adjust the borderRadius
    if (this.state.width !== -1) {
      width = this.state.width;
      height = this.state.height;
      borderRadius = this.state.height / 2.0;
    }

    return (
      <View
        style={{ aspectRatio: 1, height, width, borderRadius }}
        onLayout={this._onLayout}
      >
        {src ? (
          <Image
            source={{ uri: src }}
            style={{ width: '100%', height: '100%', borderRadius }}
          />
        ) : (
          <DefaultAvatar name={name} />
        )}
      </View>
    );
  }
}
