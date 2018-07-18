/**
 * RemoteImageView
 * @flow
 */

import * as React from 'react';
import { ColorPropType, PixelRatio, processColor, Image } from 'react-native';
import PropTypes from 'prop-types';

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styleEqual from 'style-equal';

type Layout = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type LayoutEvent = {
  nativeEvent: {
    layout: Layout,
  },
};

type Props = {|
  /** The URL from where to fetch the image. */
  imageURL: ?string,

  /** The background colour for the image view */
  placeholderBackgroundColor?: string | number,

  /** Any additional styling for the imageview */
  style?: StyleObj,

  /** Invoked when load either succeeds or fails. */
  onLoadEnd?: () => void,

  /** Invoked on load error. */
  onError?: (error: any) => void,

  /** Invoked when load completes successfully. */
  onLoad?: (source: any) => void,
|};

type State = {
  width: ?number,
  height: ?number,
};

export default class RemoteImageView extends React.Component<Props, State> {
  state = {
    width: null,
    height: null,
  };
  onLayout: LayoutEvent => void;
  static propTypes = {
    imageURL: PropTypes.string,
    placeholderBackgroundColor: ColorPropType,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
  };
  static defaultProps = {
    imageURL: '',
    placeholderBackgroundColor: processColor('#d3d3d3'),
  };

  constructor(props: Props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    ) {
      return true;
    }

    if (
      this.props.imageURL !== nextProps.imageURL ||
      this.props.placeholderBackgroundColor !==
        nextProps.placeholderBackgroundColor ||
      !styleEqual(this.props.style, nextProps.style)
    ) {
      return true;
    }

    return false;
  }

  onLayout(event: LayoutEvent) {
    const { width, height } = event.nativeEvent.layout;
    const scale = PixelRatio.get();
    this.setState({
      width: width * scale,
      height: height * scale,
    });
  }

  render() {
    const isLaidOut = !!(this.state.width && this.state.height);
    const { style, ...props } = this.props;
    Object.assign(props, {
      imageURL: isLaidOut ? props.imageURL : null,
      onLayout: this.onLayout,
    });

    // If no imageURL is given at all, simply set the placeholder background
    // color as a view backgroundColor style so that it shows immediately.
    let backgroundColorStyle = null;
    if (this.props.imageURL) {
      const placeholderBackgroundColor = processColor(
        props.placeholderBackgroundColor
      );
      if (placeholderBackgroundColor) {
        props.placeholderBackgroundColor = placeholderBackgroundColor;
      }
    } else {
      backgroundColorStyle = {
        backgroundColor: props.placeholderBackgroundColor,
      };
    }

    return (
      <Image
        style={[style, backgroundColorStyle]}
        source={{ uri: this.props.imageURL }}
        {...props}
      />
    );
  }
}
