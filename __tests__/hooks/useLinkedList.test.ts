import { renderHook, act } from '@testing-library/react-hooks';

import useLinkedList from '~/hooks/useLinkedList';

describe('useLinkedList hooks', () => {
  it('set initial list', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));
    const { list, index, value } = result.current;
    expect(list).toEqual([1, 10, 100]);
    expect(index).toBe(0);
    expect(value).toBe(1);
  });

  it('next/prev index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));
    const { next, prev } = result.current;

    act(() => {
      next();
    });
    expect(result.current.index).toBe(1);
    expect(result.current.value).toBe(10);

    act(() => {
      prev();
    });
    expect(result.current.index).toBe(0);
    expect(result.current.value).toBe(1);
  });

  it('is the first index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));

    expect(result.current.isFirst()).toBe(true);
    expect(result.current.index).toBe(0);
    expect(result.current.value).toBe(1);

    act(() => {
      result.current.next();
    });

    expect(result.current.isFirst()).toBe(false);
    expect(result.current.index).toBe(1);
    expect(result.current.value).toBe(10);
  });

  it('is the last last', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));

    expect(result.current.isLast()).toBe(false);
    expect(result.current.index).toBe(0);
    expect(result.current.value).toBe(1);

    act(() => {
      result.current.next();
      result.current.next();
    });

    expect(result.current.isLast()).toBe(true);
    expect(result.current.index).toBe(2);
    expect(result.current.value).toBe(100);
  });

  it('set initial index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100], 1));
    expect(result.current.index).toBe(1);
    expect(result.current.value).toBe(10);
  });

  it('stick to the first of the index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100]));

    expect(result.current.isFirst()).toBe(true);
    expect(result.current.index).toBe(0);
    expect(result.current.value).toBe(1);

    act(() => {
      result.current.prev();
    });

    expect(result.current.isFirst()).toBe(true);
    expect(result.current.index).toBe(0);
    expect(result.current.value).toBe(1);
  });

  it('stick to the last of the index', () => {
    const { result } = renderHook(() => useLinkedList<number>([1, 10, 100], 2));

    expect(result.current.isLast()).toBe(true);
    expect(result.current.index).toBe(2);
    expect(result.current.value).toBe(100);

    act(() => {
      result.current.next();
    });

    expect(result.current.isLast()).toBe(true);
    expect(result.current.index).toBe(2);
    expect(result.current.value).toBe(100);
  });

  it('move the first index', () => {
    const list = [1, 10, 100];
    const { result } = renderHook(() =>
      useLinkedList<number>(list, Math.floor(Math.random() * list.length)),
    );

    act(() => {
      result.current.moveFirst();
    });

    expect(result.current.isFirst()).toBe(true);
    expect(result.current.index).toBe(0);
    expect(result.current.value).toBe(1);
  });

  it('move the last index', () => {
    const list = [1, 10, 100];
    const { result } = renderHook(() =>
      useLinkedList<number>(list, Math.floor(Math.random() * list.length)),
    );

    act(() => {
      result.current.moveLast();
    });

    expect(result.current.isLast()).toBe(true);
    expect(result.current.index).toBe(list.length - 1);
    expect(result.current.value).toBe(100);
  });

  it('multiple lists', () => {
    const numbers = [1, 10, 100];
    const strings = ['a', 'b', 'c'];

    const { result: num } = renderHook(() => useLinkedList<number>(numbers));
    const { result: str } = renderHook(() => useLinkedList<string>(strings));

    expect(num.current.index).toBe(0);
    expect(str.current.index).toBe(0);

    act(() => {
      num.current.next();
    });
    expect(num.current.index).toBe(1);
    expect(str.current.index).toBe(0);
  });
});
