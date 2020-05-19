import { renderHook, act } from '@testing-library/react-hooks';

import useLinkedList from '~/hooks/useLinkedList';

describe('useLinkedList hooks', () => {
  it('set initial list', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));
    const { state, currentIndex } = result.current;
    expect(state).toEqual([1, 10, 100]);
    expect(currentIndex).toBe(0);
  });

  it('next/prev index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));
    const { next, prev } = result.current;
    act(() => {
      next();
    });
    expect(result.current.currentIndex).toBe(1);
    act(() => {
      prev();
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it('is the first index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));

    expect(result.current.isFirst()).toBe(true);
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      result.current.next();
    });

    expect(result.current.isFirst()).toBe(false);
    expect(result.current.currentIndex).toBe(1);
  });

  it('is the last last', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));

    expect(result.current.isLast()).toBe(false);
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      result.current.next();
      result.current.next();
    });

    expect(result.current.isLast()).toBe(true);
    expect(result.current.currentIndex).toBe(2);
  });
});
