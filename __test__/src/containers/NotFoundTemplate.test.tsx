import React from 'react';
import { render } from '@testing-library/react-native';
import NotFoundTemplate from '@/src/containers/NotFoundTemplate';

describe('NotFoundTemplate', () => {
  it('should render without crashing', () => {
    const rendered = render(<NotFoundTemplate />);
    expect(rendered.toJSON()).not.toBeNull();
  });
});
