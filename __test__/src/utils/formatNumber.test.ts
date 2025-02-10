import { formatNumber } from '@/src/utils/formatNumber';

describe('formatNumber', () => {
  it('should format integers with two decimal places', () => {
    expect(formatNumber('1234')).toBe('1,234.00');
    expect(formatNumber('1000000')).toBe('1,000,000.00');
  });

  it('should format decimal numbers with two decimal places', () => {
    expect(formatNumber('1234.5678')).toBe('1,234.57');
    expect(formatNumber('1234.5')).toBe('1,234.50');
  });

  it('should handle small decimal numbers', () => {
    expect(formatNumber('0.1')).toBe('0.10');
    expect(formatNumber('0.01')).toBe('0.01');
  });

  it('should handle zero', () => {
    expect(formatNumber('0')).toBe('0.00');
  });

  it('should handle negative numbers', () => {
    expect(formatNumber('-1234.56')).toBe('-1,234.56');
    expect(formatNumber('-0.1')).toBe('-0.10');
  });
});
