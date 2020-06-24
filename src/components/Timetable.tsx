import React from 'react';

import ClockContainer from '~/containers/ClockContainer';
import useTimetable from '~/hooks/useTimetable';

const timetable = {
  schedule: [0, 1, 2, 3, 4, 5, 6],
  // 06:00, 06:30, 07:10, 22:50, 23:30, 00:30
  data: [7200, 9000, 11400, 67800, 70200, 73800],
};

const Timetable: React.FC = () => {
  const now = ClockContainer.useContainer();
  const { index, value, next, prev, remaining } = useTimetable(timetable, now);

  return (
    <p>
      To: {value}
      <br />
      Remaining: {remaining(now)}, ({index})
      <br />
      Now: {now}
      <br />
      <input type="button" value="< prev" onClick={prev} />
      <input type="button" value="next >" onClick={next} />
    </p>
  );
};

export default Timetable;
