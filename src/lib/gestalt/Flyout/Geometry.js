// @flow

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { getArrowStyle } from './Utility';
import type { Size, Point, Rect, FlyoutPlacement } from './Utility';

export type Geometry = {
  origin: Point,
  arrowStyle: StyleObj,
  containerPaddingForArrowStyle: StyleObj,
  placement: FlyoutPlacement,
};

const createPoint = (x: number, y: number): Point => ({ x, y });

// Calculate the geometry based on onput parameters. We don't support automatically
// adjust the alignment if top, bottom, left or right is choosen and there is no space for it
const computeGeometry = ({
  contentSize,
  placement,
  fromRect,
  containerSize,
  arrowSize,
  padding,
}: {
  contentSize: Size,
  placement: FlyoutPlacement,
  fromRect: Rect,
  containerSize: Size,
  arrowSize: Size,
  padding: number,
}): ?Geometry => {
  const displayArea = {
    x: padding,
    y: padding,
    width: containerSize.width - padding * 2,
    height: containerSize.height - padding * 2,
  };

  const options = {
    displayArea,
    fromRect,
    contentSize,
    arrowSize,
  };

  switch (placement) {
    case 'top':
      return computeTopGeometry(options);
    case 'bottom':
      return computeBottomGeometry(options);
    case 'left':
      return computeLeftGeometry(options);
    case 'right':
      return computeRightGeometry(options);
    default:
      return computeAutoGeometry(options);
  }
};

const computeTopGeometry = ({
  displayArea,
  fromRect,
  contentSize,
  arrowSize,
}): Geometry => {
  const placement = 'top';
  const origin = createPoint(
    Math.min(
      displayArea.x + displayArea.width - contentSize.width,
      Math.max(
        displayArea.x,
        fromRect.x + (fromRect.width - contentSize.width) / 2
      )
    ),
    fromRect.y - contentSize.height - arrowSize.height
  );

  const anchorPoint = createPoint(
    fromRect.x + fromRect.width / 2.0,
    fromRect.y
  );
  const arrowStyle = getArrowStyle({
    anchorPoint,
    origin,
    arrowSize,
    placement,
  });
  const containerPaddingForArrowStyle = {
    paddingBottom: arrowStyle.height || 0,
  };

  return {
    origin,
    arrowStyle,
    containerPaddingForArrowStyle,
    placement,
  };
};

const computeBottomGeometry = ({
  displayArea,
  fromRect,
  contentSize,
  arrowSize,
}): Geometry => {
  const placement = 'bottom';
  const origin = createPoint(
    Math.min(
      displayArea.x + displayArea.width - contentSize.width,
      Math.max(
        displayArea.x,
        fromRect.x + (fromRect.width - contentSize.width) / 2
      )
    ),
    fromRect.y + fromRect.height + arrowSize.height
  );

  const anchorPoint = createPoint(
    fromRect.x + fromRect.width / 2.0,
    fromRect.y + fromRect.height
  );
  const arrowStyle = getArrowStyle({
    anchorPoint,
    origin,
    arrowSize,
    placement,
  });
  const containerPaddingForArrowStyle = {
    paddingTop: arrowStyle.height || 0,
  };

  return {
    origin,
    arrowStyle,
    containerPaddingForArrowStyle,
    placement,
  };
};

const computeLeftGeometry = ({
  displayArea,
  fromRect,
  contentSize,
  arrowSize,
}): Geometry => {
  const placement = 'left';
  const origin = createPoint(
    fromRect.x - contentSize.width - arrowSize.height,
    Math.min(
      displayArea.y + displayArea.height - contentSize.height,
      Math.max(
        displayArea.y,
        fromRect.y + (fromRect.height - contentSize.height) / 2
      )
    )
  );

  const anchorPoint = createPoint(
    fromRect.x,
    fromRect.y + fromRect.height / 2.0
  );
  const arrowStyle = getArrowStyle({
    anchorPoint,
    origin,
    arrowSize,
    placement,
  });
  const containerPaddingForArrowStyle = {
    paddingRight: arrowStyle.height || 0,
  };

  return {
    origin,
    arrowStyle,
    containerPaddingForArrowStyle,
    placement,
  };
};

const computeRightGeometry = ({
  displayArea,
  fromRect,
  contentSize,
  arrowSize,
}): Geometry => {
  const placement = 'right';
  const origin = createPoint(
    fromRect.x + fromRect.width + arrowSize.height,
    Math.min(
      displayArea.y + displayArea.height - contentSize.height,
      Math.max(
        displayArea.y,
        fromRect.y + (fromRect.height - contentSize.height) / 2
      )
    )
  );

  const anchorPoint = createPoint(
    fromRect.x + fromRect.width,
    fromRect.y + fromRect.height / 2.0
  );
  const arrowStyle = getArrowStyle({
    anchorPoint,
    origin,
    arrowSize,
    placement,
  });
  const containerPaddingForArrowStyle = {
    paddingLeft: arrowStyle.height || 0,
  };

  return {
    origin,
    arrowStyle,
    containerPaddingForArrowStyle,
    placement,
  };
};

const computeAutoGeometry = ({
  displayArea,
  fromRect,
  contentSize,
  arrowSize,
}): ?Geometry => {
  const placementsToTry = [
    computeLeftGeometry,
    computeRightGeometry,
    computeBottomGeometry,
    computeTopGeometry,
  ];

  let geometry;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < placementsToTry.length; i++) {
    const placementFn = placementsToTry[i];
    geometry = placementFn({ displayArea, fromRect, contentSize, arrowSize });
    const { origin } = geometry;
    if (
      origin.x >= displayArea.x &&
      origin.x <= displayArea.x + displayArea.width - contentSize.width &&
      origin.y >= displayArea.y &&
      origin.y <= displayArea.y + displayArea.height - contentSize.height
    ) {
      break;
    }
  }

  return geometry;
};

export default computeGeometry;
