import { renderHook, act } from '@testing-library/react-hooks';

import useTimetable, { TimetableProps } from '~/hooks/useTimetable';

describe('useTimetable hooks', () => {
  let timetable: TimetableProps;
  beforeEach(() => {
    timetable = {
      schedule: [0, 1, 2, 3, 4, 5, 6],
      // 06:00, 06:30, 07:10, 22:50, 23:30, 00:30
      data: [7200, 9000, 11400, 67800, 70200, 73800],
    };
  });

  it('set initial timetable', () => {
    const currentTime = new Date('2020-05-28T07:09:30').getTime();
    const { result } = renderHook(() => useTimetable(timetable, currentTime));
    expect(result.current.index).toBe(0);
    expect(result.current.remaining(currentTime)).toBe(30);
  });

  describe('インデックス操作が可能', () => {
    const currentTime = new Date('2020-05-28T10:00:00').getTime();

    it('`next()`で一つ次の発車時刻へ', () => {
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.index).toBe(0);

      act(() => {
        result.current.next();
      });
      expect(result.current.index).toBe(1);
    });

    it('`moveFirst()`でどこからでも先頭へ移動', () => {
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.index).toBe(0);

      act(() => {
        result.current.moveFirst();
      });
      expect(result.current.index).toBe(0);

      act(() => {
        result.current.next();
        result.current.next();
      });
      expect(result.current.index).toBe(2);

      act(() => {
        result.current.moveFirst();
      });
      expect(result.current.index).toBe(0);
    });

    it('`isFirst()`で先頭かどうか判定', () => {
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.isFirst()).toBe(true);

      act(() => {
        result.current.next();
      });
      expect(result.current.isFirst()).toBe(false);
    });

    it('`prev()`で一つ次の発車時刻へ', () => {
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      act(() => {
        result.current.next();
        result.current.next();
      });
      expect(result.current.index).toBe(2);

      act(() => {
        result.current.prev();
      });
      expect(result.current.index).toBe(1);
    });

    it('`moveLast()`でどこからでも最終時刻へ移動', () => {
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.index).toBe(0);
      act(() => {
        result.current.next();
        result.current.next();
      });
      expect(result.current.index).toBe(2);

      act(() => {
        result.current.moveLast();
      });
      expect(result.current.index).toBe(2);

      act(() => {
        result.current.prev();
        result.current.prev();
      });
      expect(result.current.index).toBe(0);

      act(() => {
        result.current.moveLast();
      });
      expect(result.current.index).toBe(2);
    });

    it('`isLast()`で最後かどうか判定', () => {
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      act(() => {
        result.current.moveLast();
      });
      expect(result.current.isLast()).toBe(true);

      act(() => {
        result.current.prev();
      });
      expect(result.current.isLast()).toBe(false);
    });
  });

  describe('時間経過で保持する時刻表データも進む', () => {
    it('発車時刻ちょうどの場合は残り時間は`0`', () => {
      const currentTime = new Date('2020-05-28T07:10:00').getTime();
      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.remaining(currentTime)).toBe(0);
    });

    it('発車済みの時刻は削除される', () => {
      const currentTime = new Date('2020-05-28T06:29:59').getTime();
      const elapsedTime = currentTime + 2000; // 2 seconds

      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.remaining(currentTime)).toBe(1);

      act(() => {
        result.current.tick(elapsedTime);
      });
      expect(result.current.remaining(elapsedTime)).toBe(2399);
    });

    it('発車時刻を越えたとき`index`が先頭`0`であれば維持', () => {
      const currentTime = new Date('2020-05-28T06:29:59').getTime();
      const elapsedTime = currentTime + 2000; // 2 seconds

      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.index).toBe(0);

      act(() => {
        result.current.tick(elapsedTime);
      });
      expect(result.current.index).toBe(0);
    });

    it('発車時刻を越えたとき`index`が先頭`1`以上であれば`-1`される', () => {
      const currentTime = new Date('2020-05-28T06:29:59').getTime();
      const elapsedTime = currentTime + 2000; // 2 seconds

      const { result } = renderHook(() => useTimetable(timetable, currentTime));
      expect(result.current.index).toBe(0);

      act(() => {
        result.current.next();
        result.current.next();
      });
      expect(result.current.index).toBe(2);

      act(() => {
        result.current.tick(elapsedTime);
      });
      expect(result.current.index).toBe(1);
    });
  });
});
