// @flow

// After update to 0.52 use this one
// import type { Layout, LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes'

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
