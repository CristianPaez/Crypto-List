import React from 'react';
import { render } from '@testing-library/react-native';
import HomeTemplate from '@/src/containers/HomeTemplate';

// Mock hooks
jest.mock('@/src/hooks/useCryptoList', () => ({
  useCryptoList: () => ({
    cryptos: [],
    loading: false,
    search: '',
    handleSearch: () => {},
  }),
}));

describe('HomeTemplate', () => {
  it('should render without crashing', () => {
    const rendered = render(<HomeTemplate />);
    expect(rendered.toJSON()).not.toBeNull();
  });
});
