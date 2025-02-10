import { getPercentageColor } from '@/src/utils/getPercentageColor';

describe('getPercentageColor', () => {
  it('should return green color for positive values', () => {
    const result = getPercentageColor('5.25');
    expect(result.color).toBe('#4CAF50');
    expect(result.value).toBe('+5.25%');
  });

  it('should return red color for negative values', () => {
    const result = getPercentageColor('-3.75');
    expect(result.color).toBe('#FF5252');
    expect(result.value).toBe('-3.75%');
  });

  it('should handle zero value', () => {
    const result = getPercentageColor('0');
    expect(result.color).toBe('#4CAF50');
    expect(result.value).toBe('+0%');
  });

  it('should handle decimal numbers', () => {
    const result = getPercentageColor('0.001');
    expect(result.color).toBe('#4CAF50');
    expect(result.value).toBe('+0.001%');
  });

  it('should handle string numbers with multiple decimal places', () => {
    const result = getPercentageColor('-2.345678');
    expect(result.color).toBe('#FF5252');
    expect(result.value).toBe('-2.345678%');
  });
});
