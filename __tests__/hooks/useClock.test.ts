import { renderHook, act } from '@testing-library/react-hooks';

import useClock from '~/hooks/useClock';

describe('useClock hooks', () => {
  beforeEach(() => {
    // @ts-ignore: [TODO] ts-jest[versions] via https://github.com/kulshekhar/ts-jest/issues/1595
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('set initial time', () => {
    const { result } = renderHook(() => useClock());
    expect(result.current).toBe(Date.now());
  });

  it('advance 1 sec', () => {
    const { result } = renderHook(() => useClock());
    const now = Date.now();

    expect(result.current).toBe(now);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(now);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(now + 1000);
  });
});
