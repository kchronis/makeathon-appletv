/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

test('<Button color="transparent" />', () => {
  const tree = renderer.create(<Button text="Hello World" />).toJSON();
  expect(tree).toMatchSnapshot();
});
