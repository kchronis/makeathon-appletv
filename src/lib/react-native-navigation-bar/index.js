/**
 * NavigationBar
 * @flow
 *
 * NavigationBar is trying to lay out the title view based on the native
 * UI standards. This means on iOS it tries to center the title at all times.
 * On Android the title get's aligned to the left side at all times, if a left
 * view is available it get's detached to it otherwise it will be on the far right.
 *
 * Truncation happens based on the left and right view. The title always tries
 * to fit within the space that is available within the container's width minus
 * the width of the left and right view.
 */

import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import withOrientation from './withOrientation';

const CONTAINER_VIEW_LAYOUT_KEY = 'containerViewLayout';
const TITLE_VIEW_LAYOUT_KEY = 'titleViewLayout';
const LEFT_VIEW_LAYOUT_KEY = 'leftViewLayout';
const RIGHT_VIEW_LAYOUT_KEY = 'rightViewLayout';

// Layout Handling

export type Layout = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type LayoutEvent = {
  nativeEvent: {
    layout: Layout,
  },
};

export type LayoutCache = { [string]: Layout };

const ZERO_LAYOUT: Layout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const isEqualLayout = (left: Layout, right: Layout) =>
  left.x === right.x &&
  left.y === right.y &&
  left.width === right.width &&
  left.height === right.height;

// App Bar

// TODO: Bridge this values from native side
const NAV_BAR_HEIGHT_IOS_PORTRAIT = 44.0;
const NAV_BAR_HEIGHT_IOS_LANDSCAPE = 32.0;
const NAV_BAR_HEIGHT_ANDROID = 56.0;

const getAppBarHeight = (isLandscape: boolean) => {
  if (Platform.OS === 'ios') {
    return isLandscape && !Platform.isPad
      ? NAV_BAR_HEIGHT_IOS_LANDSCAPE
      : NAV_BAR_HEIGHT_IOS_PORTRAIT;
  }

  // Android
  return NAV_BAR_HEIGHT_ANDROID;
};

// NavigationBar

type Props = {
  leftView?: React.Node,
  titleView?: React.Node,
  rightView?: React.Node,
  isLandscape: boolean,
  style?: StyleObj,
};

type State = {
  layouts: LayoutCache,
};

class NavigationBar extends React.PureComponent<Props, State> {
  state = {
    layouts: {},
  };

  // Component

  componentDidUpdate(prevProps) {
    // If the component did update let's remove hte title view layout
    // and re-render the component to adapt the title view
    if (
      this.props.rightView !== prevProps.rightView ||
      this.props.leftView !== prevProps.leftView ||
      this.props.titleView !== prevProps.titleView
    ) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState(prevState => {
        const layouts: LayoutCache = { ...prevState.layouts };
        delete layouts[TITLE_VIEW_LAYOUT_KEY];
        return { layouts };
      });
    }
  }

  // Layout callbacks and calculations

  _onContainerLayout = (event: LayoutEvent) => {
    // If the container changes we have to re-layout the title view
    this._saveLayoutForKey(event.nativeEvent.layout, CONTAINER_VIEW_LAYOUT_KEY);
  };

  _onTitleViewLayout = (event: LayoutEvent) => {
    this._saveLayoutForKey(event.nativeEvent.layout, TITLE_VIEW_LAYOUT_KEY);
  };

  _onLeftViewLayout = (event: LayoutEvent) => {
    this._saveLayoutForKey(event.nativeEvent.layout, LEFT_VIEW_LAYOUT_KEY);
  };

  _onRightViewLayout = (event: LayoutEvent) => {
    this._saveLayoutForKey(event.nativeEvent.layout, RIGHT_VIEW_LAYOUT_KEY);
  };

  _saveLayoutForKey = (layout: Layout, key: string) => {
    if (!layout) {
      return;
    }

    // Don't set the same layout twice
    const { layouts } = this.state;
    if (layouts[key] && isEqualLayout(layouts[key], layout)) {
      return;
    }

    // Update layouts cache and final header view style if possible
    this.setState(prevState => {
      // Update layout cache
      const newLayouts = { ...prevState.layouts };
      newLayouts[key] = layout;
      return { layouts: newLayouts };
    });
  };

  // Calculates the header view final layout if all sublayouts are available
  _calculateTitleViewStyleIfPossible = (layouts: LayoutCache) => {
    // Not necessary to calculate a title style if no one is there
    if (!this._shouldRenderTitleView()) {
      return {};
    }

    // Wait until all layouts are available
    const containerViewLayout = layouts[CONTAINER_VIEW_LAYOUT_KEY];
    const titleViewLayout = layouts[TITLE_VIEW_LAYOUT_KEY];

    if (
      !containerViewLayout ||
      !titleViewLayout ||
      (this._shouldRenderLeftView() && !layouts[LEFT_VIEW_LAYOUT_KEY]) ||
      (this._shouldRenderRightView() && !layouts[RIGHT_VIEW_LAYOUT_KEY])
    ) {
      return null;
    }

    // Layout the header if all layouts are available
    const containerWidth = containerViewLayout.width;
    const leftViewLayout = layouts[LEFT_VIEW_LAYOUT_KEY] || ZERO_LAYOUT;
    const rightViewLayout = layouts[RIGHT_VIEW_LAYOUT_KEY] || ZERO_LAYOUT;

    const titleViewStyle = {};

    // Calculate width of title view
    // We have to ceil in this case as on iPhone X the title could get truncated
    // for certain cases as the calculated with of the title view layout is too small
    titleViewStyle.width = Math.ceil(titleViewLayout.width);

    const titleViewAvailableWidth =
      containerWidth - leftViewLayout.width - rightViewLayout.width;
    if (titleViewAvailableWidth < titleViewStyle.width) {
      // Set the width of the title view to the available width if it's smaller
      // than the calculated titleview width
      titleViewStyle.width = titleViewAvailableWidth;
    }

    // Calculate position of title view

    // We are starting by attaching the header to the left side of leftView
    titleViewStyle.left = leftViewLayout.x + leftViewLayout.width;

    // On Android we are just attaching the title view to the left view
    if (Platform.OS === 'android') {
      // Prevent bug on Android where left=0 does not render anything
      titleViewStyle.left =
        titleViewStyle.left > 0 ? titleViewStyle.left : 0.0001;
      return titleViewStyle;
    }

    // Try to center it within the overall container if it fit's within the
    // available width
    if (titleViewStyle.width !== titleViewAvailableWidth) {
      // Calculate the center value
      const titleViewStyleCenterValue =
        Math.ceil(containerWidth - titleViewStyle.width) / 2.0;
      // Check if the center value is larger than the left view x
      if (titleViewStyleCenterValue > titleViewStyle.left) {
        // Handle if title view would go into the right view layout
        if (
          this._shouldRenderRightView() &&
          titleViewStyleCenterValue + titleViewStyle.width > rightViewLayout.x
        ) {
          // Align it at the end of the left view if it does go over the right view
          titleViewStyle.left = rightViewLayout.x - titleViewStyle.width;
        } else {
          // else align the title view centered
          titleViewStyle.left = titleViewStyleCenterValue;
        }
      }
    }

    return titleViewStyle;
  };

  // Render Views

  _shouldRenderLeftView = () => this.props.leftView != null;

  _renderLeftView = () =>
    this.props.leftView && (
      <View style={[styles.leftView]} onLayout={this._onLeftViewLayout}>
        {this.props.leftView}
      </View>
    );

  _shouldRenderTitleView = () => this.props.titleView != null;

  // Dummy title view is rendered to get the full size of the title view
  _renderDummyTitleView = titleViewStyle =>
    this.props.titleView && (
      <View
        style={[styles.titleView, titleViewStyle]}
        onLayout={this._onTitleViewLayout}
      >
        {this.props.titleView}
      </View>
    );

  _renderTitleView = (titleViewStyle: {}) =>
    this.props.titleView && (
      <View style={[styles.titleView, titleViewStyle]}>
        {this.props.titleView}
      </View>
    );

  _shouldRenderRightView = () => this.props.rightView;

  _renderRightView = () =>
    this.props.rightView && (
      <View style={[styles.rightView]} onLayout={this._onRightViewLayout}>
        {this.props.rightView}
      </View>
    );

  render() {
    const { isLandscape, style } = this.props;

    const containerViewStyle = {
      height: getAppBarHeight(isLandscape),
    };

    // Calculate titleViewStyle if possible
    const titleViewStyle = this._calculateTitleViewStyleIfPossible(
      this.state.layouts
    );

    return (
      <View
        onLayout={this._onContainerLayout}
        style={[styles.containerView, containerViewStyle, style]}
      >
        {this._renderLeftView()}
        {titleViewStyle
          ? this._renderTitleView(titleViewStyle)
          : this._renderDummyTitleView(styles.dummyTitleView)}
        {this._renderRightView()}
      </View>
    );
  }
}

export default withOrientation(NavigationBar);

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    justifyContent: 'center',
  },
  dummyTitleView: {
    // display:none alone will will not work on Android: https://github.com/facebook/react-native/issues/18415
    // Furthermore display:none will not call onLayout on certain React Native versions
    // display: 'none',
    opacity: 0,
  },
  titleView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
  rightView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    justifyContent: 'center',
  },
});
