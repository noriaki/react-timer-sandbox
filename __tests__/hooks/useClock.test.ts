import { renderHook, act } from '@testing-library/react-hooks';

import useClock from '~/hooks/useClock';

describe('useClock hooks', () => {
  beforeEach(() => {
    // [TODO] via https://github.com/kulshekhar/ts-jest/issues/1595
    // @ts-ignore: ts-jest[versions]
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('set initial time', () => {
    const { result } = renderHook(() => useClock());
    expect(result.current).toBe(Date.now());
  });

  it('advance 1 sec when passing interval arg is 1000 msec', () => {
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

  it('should start time by initialTime arg is -1000 msec', () => {
    const now = Date.now();
    const initialTime = now - 1000;
    const { result } = renderHook(() => useClock(initialTime));

    expect(result.current).toBe(initialTime);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(initialTime);

    act(() => {
      jest.advanceTimersByTime(900);
    });
    expect(result.current).toBe(now + 1000);
  });

  it('advance 1 sec when passing interval arg is 200 msec', () => {
    const { result } = renderHook(() => useClock(undefined, 200));
    const now = Date.now();

    expect(result.current).toBe(now);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(now);

    act(() => {
      jest.advanceTimersByTime(450);
    });
    expect(result.current).toBe(now + 400);

    act(() => {
      jest.advanceTimersByTime(450);
    });
    expect(result.current).toBe(now + 1000);
  });
});
