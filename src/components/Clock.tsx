import React from 'react';

import useClock from '~/hooks/useClock';

type ReactComponent = React.FC<{
  currentTime: number;
}>;

const Clock: ReactComponent = ({ currentTime }) => {
  const now = useClock(currentTime);

  const current = new Date(now);
  return (
    <p>
      {current.toString()}, {now}
    </p>
  );
};

export default Clock;
