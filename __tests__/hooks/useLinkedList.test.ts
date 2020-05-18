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
});
