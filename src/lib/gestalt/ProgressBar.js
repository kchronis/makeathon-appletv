// @flow

import React from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Text from './Text';
import type { LayoutEvent } from './CoreEventTypes';

import PIColor from '../styles/picolor';

type Props = {|
  initialProgress: number, // A number between 0 and 1
  progress: number, // A number between 0 and 1
  easing: (value: number) => number, // Easing function
  easingDuration: number, // Easing duration for progres schanges
  style: StyleObj, // Style object for progress bar
  backgroundStyle: StyleObj, // Style object for background of progress bar
  fillStyle: StyleObj, // Style object for fill of progress bar
|};

type State = {
  animatedProgress: Animated.Value, // Current progress of component
  width?: number,
  height?: number,
};

export default class ProgressBar extends React.Component<Props, State> {
  static defaultProps = {
    initialProgress: 0,
    easing: Easing.inOut(Easing.ease),
    easingDuration: 500,
    style: styles,
    backgroundStyle: {},
    fillStyle: {},
  };

  constructor(props: Props) {
    super(props);

    const { initialProgress } = props;
    this.state = {
      animatedProgress: new Animated.Value(initialProgress),
    };
  }

  componentDidUpdate(prevProps: Props) {
    // Update the component if the progress changed
    const { progress, easingDuration } = this.props;
    if (progress >= 0 && progress !== prevProps.progress) {
      // If the duration is set to 0 let's not animate and assume it was reset
      const duration = progress === 0 ? 0 : easingDuration;
      this._animateToNewProgress(duration);
    }
  }

  _onLayout = (event: LayoutEvent) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      width,
      height,
    });
  };

  render() {
    const { style, backgroundStyle, fillStyle } = this.props;
    const { animatedProgress, width = 0 } = this.state;

    const fillWidth = animatedProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * width, 1 * width],
    });

    return (
      <View
        style={StyleSheet.flatten([styles.background, backgroundStyle, style])}
        onLayout={this._onLayout}
      >
        <Animated.View
          style={StyleSheet.flatten([
            styles.fill,
            fillStyle,
            { width: fillWidth },
          ])}
        />
      </View>
    );
  }
  _animateToNewProgress = (duration: number) => {
    const { easing, progress: toValue } = this.props;
    const { animatedProgress } = this.state;
    Animated.timing(animatedProgress, {
      easing,
      duration,
      toValue,
      // useNativeDriver: true, // Unfortunately width is not supported for useNativeDriver
    }).start();
  };
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: PIColor.lightGrayColor,
    height: 9,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: PIColor.darkGrayColor,
    height: 9,
  },
});

// Playground support

// eslint-disable-next-line import/first
import { type PlaygroundDefineType } from '../../screens/Playground/Playground';

module.exports.__cards__ = (define: PlaygroundDefineType) => {
  define(
    'Progress Bar Default',
    (state = { progress: 0 }, update: mixed => void) => {
      setTimeout(() => {
        const progress =
          state.progress === 1.0
            ? 0.0
            : Math.min(state.progress + 0.4 * Math.random(), 1.0);
        update({ progress });
      }, 1000);
      return (
        <View
          style={{
            backgroundColor: PIColor.primaryBackgroundColor,
            flex: 1,
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Text style={{ paddingBottom: 5 }}>ProgressBar:</Text>
          <ProgressBar
            progress={state.progress}
            style={{ marginTop: 10, width: '100%' }}
          />
        </View>
      );
    }
  );
};
