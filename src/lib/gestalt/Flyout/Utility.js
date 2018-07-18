// @flow
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type Size = {
  width: number,
  height: number,
};

export type Point = {
  x: number,
  y: number,
};

export type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type FlyoutPlacement = 'left' | 'right' | 'top' | 'bottom' | 'auto';

export type ContainerStyle = {
  top: number,
  left: number,
  maxWidth: number,
  maxHeight: number,
};

export const capitalizeFirstLetter = (string?: string): string =>
  !string ? '' : string.charAt(0).toUpperCase() + string.slice(1);

// TODO: Figure out how to flow type that better. The input parameter is a
// StyleSheet object
export const findDirectionWithoutColor = (arrowStyle: any): string => {
  const directionsWithColor = Object.keys(arrowStyle || {})
    .filter(key => /border[a-z]*Color/i.test(key))
    .filter(key => arrowStyle[key] === undefined)
    .map(key =>
      key
        .replace(/border/i, '')
        .replace(/color/i, '')
        .toLowerCase()
    );

  return directionsWithColor[0];
};

export const getArrowStyle = ({
  anchorPoint,
  origin,
  arrowSize,
  placement,
}: {
  anchorPoint: Point,
  origin: Point,
  arrowSize: Size,
  placement: FlyoutPlacement,
}): StyleObj => {
  let width;
  let height;
  // swap width and height for left / right positioned tooltips
  if (placement === 'top' || placement === 'bottom') {
    width = arrowSize.width;
    height = arrowSize.height * 2;
  } else {
    width = arrowSize.height * 2;
    height = arrowSize.width;
  }

  return {
    width,
    height,
    left: placement === 'right' ? 0 : anchorPoint.x - origin.x - width / 2.0,
    top: placement === 'bottom' ? 0 : anchorPoint.y - origin.y - height / 2.0,
    borderTopWidth: height / 2.0,
    borderRightWidth: width / 2.0,
    borderBottomWidth: height / 2.0,
    borderLeftWidth: width / 2.0,
    borderTopColor: placement === 'top' ? undefined : 'transparent',
    borderRightColor: placement === 'right' ? undefined : 'transparent',
    borderBottomColor: placement === 'bottom' ? undefined : 'transparent',
    borderLeftColor: placement === 'left' ? undefined : 'transparent',
  };
};
