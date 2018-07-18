// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  NativeModules,
  findNodeHandle,
} from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type { LayoutEvent } from './../CoreEventTypes';
import computeGeometry from './Geometry';
import { capitalizeFirstLetter, findDirectionWithoutColor } from './Utility';
import type {
  Size,
  Point,
  Rect,
  FlyoutPlacement,
  ContainerStyle,
} from './Utility';

const invariant = require('fbjs/lib/invariant');

type UIManagerType = {
  measure: (
    ref: ?React.Node,
    (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => void
  ) => void,
};

const UIManager = (NativeModules.UIManager: UIManagerType);

const {
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
}: { height: number, width: number } = Dimensions.get('window');

const MAX_Z_INDEX = 9999;

type Props = {
  containerSize: Size, // The available size for the FlyoutContent
  fromRect: ?Rect, // Rect that the FlyoutContent will attach to
  fromView: ?React.ElementRef<typeof React.Component>, // Ref for the element that the FlyoutContent will attach to
  padding: number, // The padding for the FlyoutContent content
  arrowColor: string, // The color of the arrow
  arrowWidth: number, // The width of the arrow
  arrowHeight: number, // The height of the arrow
  placement: FlyoutPlacement, // The placeement of the FlyoutContent
  pointerEvents: string, // Controls whether the FlyoutContent can be the target of touch events.
  offset: Point, // Define an offset to the position calculated by the FlyoutContent
  component: () => React.Node, // Component to render in the FlyoutContent
};

type State = {
  containerStyle: ContainerStyle,
  arrowStyle: ?StyleObj,
  containerPaddingForArrowStyle: ?StyleObj,
  width: number,
  height: number,
};

export default class FlyoutContent extends React.Component<Props, State> {
  static defaultProps = {
    // For now we assume we have the whole screen width and height to show the
    // Flyout
    containerSize: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
    fromRect: null,
    fromView: null,
    pointerEvents: 'box-none',
    offset: {
      x: 0,
      y: 0,
    },
  };

  constructor(props: Props) {
    super(props);

    const { containerSize, padding } = props;
    this.state = {
      // Render offscren initially
      containerStyle: {
        top: -9999,
        left: -9999,
        maxWidth: containerSize.width - padding * 2,
        maxHeight: containerSize.height - padding * 2,
      },
      arrowStyle: null,
      containerPaddingForArrowStyle: null,
      width: 0,
      height: 0,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props === nextProps) {
      return;
    }

    this._measureAndComputeStylesForProps(nextProps);
  }

  render() {
    const { pointerEvents, component, arrowColor } = this.props;
    const {
      containerStyle,
      arrowStyle,
      containerPaddingForArrowStyle,
    } = this.state;
    const borderDirection = capitalizeFirstLetter(
      findDirectionWithoutColor(arrowStyle)
    );

    return (
      <View
        style={StyleSheet.flatten([
          styles.absolute,
          containerStyle,
          containerPaddingForArrowStyle,
          { zIndex: MAX_Z_INDEX },
        ])}
      >
        <View onLayout={this._onLayout}>{React.createElement(component)}</View>
        <View
          style={[
            styles.absolute,
            arrowStyle,
            { [`border${borderDirection}Color`]: arrowColor },
          ]}
          pointerEvents={pointerEvents}
        />
      </View>
    );
  }

  _onLayout = (event: LayoutEvent) => {
    const { width, height } = event.nativeEvent.layout;

    this.setState({ width, height }, () => {
      this._measureAndComputeStylesForProps(this.props);
    });
  };

  _measureAndComputeStylesForProps = (props: Props) => {
    // For some reason if we use props.fromView in here flow does not
    // detect that we use the fromView prop
    const { fromView } = props;
    if (fromView) {
      // Try to measure the fromView and than compute the style
      // We use the fromView to attach the Flyout automatically
      UIManager.measure(
        findNodeHandle(fromView),
        (x: number, y: number, fromWidth: number, fromHeight: number) => {
          // Update fromRect to the fromView values
          const newProps = {
            ...props,
            fromRect: {
              x,
              y,
              width: fromWidth,
              height: fromHeight,
            },
          };
          this._computeStyles(newProps);
        }
      );
      return;
    }

    // No fromView given let's use the fromRect passed in
    this._computeStyles(props);
  };

  // Compute the new styles for given props and update the state
  _computeStyles = (props: Props): void => {
    // We are passing in the whole props and destructing it here and not just a
    // subset as flow would not detect that the props we are passing in are
    // actually used
    const {
      arrowHeight,
      arrowWidth,
      containerSize,
      padding,
      placement,
    } = props;
    let { fromRect } = props;
    // Assert in development and just assign a default object in production
    // better maybe just crash there too.
    invariant(fromRect, 'No valid fromView or fromRect was given.');
    // eslint-disable-next-line no-param-reassign
    fromRect = fromRect || { x: 0, y: 0, width: 0, height: 0 };

    const { offset } = this.props;
    const { width, height, containerStyle } = this.state;
    const geometry = computeGeometry({
      contentSize: { width, height },
      fromRect,
      containerSize,
      arrowSize: {
        width: arrowWidth,
        height: arrowHeight,
      },
      padding,
      placement,
    });

    // TODO: How do we handle the case if geometry is undefined
    invariant(geometry, 'No valid geometry could be computed.');

    this.setState({
      containerStyle: {
        ...containerStyle,
        top: geometry.origin.y + offset.y,
        left: geometry.origin.x + offset.x,
      },
      arrowStyle: geometry.arrowStyle,
      containerPaddingForArrowStyle: geometry.containerPaddingForArrowStyle,
    });
  };
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});
