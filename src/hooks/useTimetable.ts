import { useState, useCallback, useRef } from 'react';

export type TimetableProps = {
  schedule: number[];
  data: number[];
};

export type TimetableHook = {
  index: number;
  value: number;
  tick: (nextTime: number) => void;
  next: () => void;
  remaining: number;
};

const getSecondsSince4am: (time: number) => number = (time) => {
  const d = new Date(time);
  const hours = (d.getHours() - 4) * 60 * 60;
  const minutes = d.getMinutes() * 60;
  const seconds = d.getSeconds();
  return hours + minutes + seconds;
};

const getSlicedData: (data: number[], time: number) => number[] = (
  data,
  time,
) => {
  const currentTimeAsSeconds = getSecondsSince4am(time);
  return data.filter((s) => s >= currentTimeAsSeconds);
};

const useTimetable = (
  timetable: TimetableProps,
  currentTime: number = Date.now(),
): TimetableHook => {
  const time = useRef(currentTime);
  const [currentIndex, setIndex] = useState(0);
  const [currentData, setData] = useState(
    getSlicedData(timetable.data, time.current),
  );

  const value = currentData[currentIndex];
  const remaining = value - getSecondsSince4am(time.current);

  const next = useCallback(() => {
    setIndex((prevIndex) => {
      if (prevIndex >= currentData.length - 1) {
        return currentData.length - 1;
      }
      return prevIndex + 1;
    });
  }, [currentData.length]);

  const prev = useCallback(() => {
    setIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return 0;
      }
      return prevIndex - 1;
    });
  }, []);

  const tick = useCallback<TimetableHook['tick']>(
    (nextTime) => {
      time.current = nextTime;
      const nextData = getSlicedData(timetable.data, time.current);
      if (currentData.length !== nextData.length) {
        prev();
      }
      setData(nextData);
    },
    [timetable.data, currentData.length, prev],
  );

  return {
    index: currentIndex,
    value,
    tick,
    next,
    remaining,
  };
};

export default useTimetable;
