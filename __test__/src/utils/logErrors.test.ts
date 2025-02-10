import { logErrors } from '@/src/utils/logErrors';

describe('logErrors', () => {
  let consoleErrorSpy: jest.SpyInstance;
  const mockDate = new Date('2025-01-01T00:00:00.000Z');

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('should handle Error instances', () => {
    const error = new Error('Test error');
    const result = logErrors(error);

    expect(result).toEqual({
      message: 'Test error',
      timestamp: '2025-01-01T00:00:00.000Z',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error message:', 'Test error');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Stack trace:', error.stack);
  });

  it('should handle Response instances', () => {
    const response = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
    const result = logErrors(response);

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      timestamp: '2025-01-01T00:00:00.000Z',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('HTTP Error:', {
      status: 404,
      statusText: 'Not Found',
      url: '',
    });
  });

  it('should handle unknown error types', () => {
    const unknownError = { custom: 'error' };
    const result = logErrors(unknownError);

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      timestamp: '2025-01-01T00:00:00.000Z',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unknown error:', unknownError);
  });

  it('should handle null or undefined errors', () => {
    const result = logErrors(null);

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      timestamp: '2025-01-01T00:00:00.000Z',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unknown error:', null);
  });
});
