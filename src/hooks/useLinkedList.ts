import { useState, useCallback } from 'react';

type LinkedListHook<T> = {
  state: T[];
  currentIndex: number;
  next: () => void;
  prev: () => void;
  isFirst: () => boolean;
  isLast: () => boolean;
};

const useLinkedList = <T>(initialLinkedList: T[] = []): LinkedListHook<T> => {
  const [linkedList] = useState(initialLinkedList);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  const isFirst = useCallback(() => index === 0, [index]);
  const isLast = useCallback(() => index === linkedList.length - 1, [
    index,
    linkedList.length,
  ]);

  return {
    state: linkedList,
    currentIndex: index,
    next,
    prev,
    isFirst,
    isLast,
  };
};

export default useLinkedList;
