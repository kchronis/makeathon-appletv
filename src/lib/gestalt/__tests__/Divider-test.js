/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Divider from '../Divider';

test('<Divider />', () => {
  const tree = renderer.create(<Divider />).toJSON();
  expect(tree).toMatchSnapshot();
});
