import { Reducer, useReducer, useCallback } from 'react';

export type TimetableProps = {
  schedule: number[];
  data: number[];
};

export type TimetableHook = {
  index: number;
  value: number;
  tick: (nextTime: number) => void;
  next: () => void;
  prev: () => void;
  remaining: (time: number) => number;
  isFirst: () => boolean;
  isLast: () => boolean;
  moveFirst: () => void;
  moveLast: () => void;
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

type TimetableState = {
  schedule: number[];
  data: number[];
  index: number;
};

enum ActionType {
  TICK = 'TICK',
  NEXT = 'NEXT',
  PREV = 'PREV',
  MOVE_FIRST = 'MOVE_FIRST',
  MOVE_LAST = 'MOVE_LAST',
}

type TimetableAction = {
  type: ActionType;
  payload?: number;
};

const reducer: Reducer<TimetableState, TimetableAction> = (state, action) => {
  const { index, data } = state;
  switch (action.type) {
    case ActionType.TICK: {
      if (typeof action.payload !== 'number') {
        throw new Error('payload:number is required');
      }
      const nextData = getSlicedData(data, action.payload);
      return {
        ...state,
        data: nextData,
        index: data.length !== nextData.length && index > 0 ? index - 1 : index,
      };
    }
    case ActionType.NEXT: {
      return {
        ...state,
        index: index === data.length - 1 ? index : index + 1,
      };
    }
    case ActionType.PREV: {
      return {
        ...state,
        index: index === 0 ? 0 : index - 1,
      };
    }
    case ActionType.MOVE_FIRST: {
      return { ...state, index: 0 };
    }
    case ActionType.MOVE_LAST: {
      return { ...state, index: data.length - 1 };
    }
    default: {
      throw new Error('never rearch action');
    }
  }
};

const useTimetable = (
  timetable: TimetableProps,
  currentTime: number = Date.now(),
): TimetableHook => {
  const [{ index: currentIndex, data: currentData }, dispatch] = useReducer(
    reducer,
    {
      ...timetable,
      data: getSlicedData(timetable.data, currentTime),
      index: 0,
    },
  );

  const next = useCallback(() => dispatch({ type: ActionType.NEXT }), []);

  const prev = useCallback(() => dispatch({ type: ActionType.PREV }), []);

  const tick = useCallback<TimetableHook['tick']>(
    (nextTime) => dispatch({ type: ActionType.TICK, payload: nextTime }),
    [],
  );

  const value = currentData[currentIndex];
  const remaining = useCallback<TimetableHook['remaining']>(
    (time) => {
      const remainingTime = value - getSecondsSince4am(time);
      if (remainingTime < 0) {
        tick(time);
        return 0;
      }
      return remainingTime;
    },
    [value, tick],
  );

  const isFirst = useCallback(() => currentIndex === 0, [currentIndex]);
  const isLast = useCallback(() => currentIndex === currentData.length - 1, [
    currentIndex,
    currentData.length,
  ]);

  const moveFirst = useCallback(
    () => dispatch({ type: ActionType.MOVE_FIRST }),
    [],
  );
  const moveLast = useCallback(
    () => dispatch({ type: ActionType.MOVE_LAST }),
    [],
  );

  return {
    index: currentIndex,
    value,
    tick,
    next,
    prev,
    remaining,
    isFirst,
    isLast,
    moveFirst,
    moveLast,
  };
};

export default useTimetable;
