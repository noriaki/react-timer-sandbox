import { useState, useCallback } from 'react';

type LinkedListHook<T> = {
  state: T[];
  currentIndex: number;
  next: () => void;
  prev: () => void;
};

const useLinkedList = <T>(initialLinkedList: T[] = []): LinkedListHook<T> => {
  const [linkdedList] = useState(initialLinkedList);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  return { state: linkdedList, currentIndex: index, next, prev };
};

export default useLinkedList;
