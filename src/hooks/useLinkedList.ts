import { useState, useCallback } from 'react';

type LinkedListHook<T> = {
  state: T[];
  currentIndex: number;
  next: () => void;
  prev: () => void;
  isFirst: () => boolean;
  isLast: () => boolean;
  moveFirst: () => void;
  moveLast: () => void;
};

const useLinkedList = <T>(
  initialLinkedList: T[] = [],
  initialIndex = 0,
): LinkedListHook<T> => {
  const [linkedList] = useState(initialLinkedList);
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(
    () =>
      setIndex((i) => {
        const newIndex = i + 1;
        if (newIndex > linkedList.length - 1) {
          return i;
        }
        return newIndex;
      }),
    [linkedList.length],
  );
  const prev = useCallback(
    () =>
      setIndex((i) => {
        const newIndex = i - 1;
        if (newIndex < 0) {
          return i;
        }
        return newIndex;
      }),
    [],
  );

  const isFirst = useCallback(() => index === 0, [index]);
  const isLast = useCallback(() => index === linkedList.length - 1, [
    index,
    linkedList.length,
  ]);

  const moveFirst = useCallback(() => setIndex(0), []);
  const moveLast = useCallback(() => setIndex(linkedList.length - 1), [
    linkedList.length,
  ]);

  return {
    state: linkedList,
    currentIndex: index,
    next,
    prev,
    isFirst,
    isLast,
    moveFirst,
    moveLast,
  };
};

export default useLinkedList;
