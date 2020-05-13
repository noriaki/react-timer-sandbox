import React from 'react';

import ClockContainer from '~/containers/ClockContainer';

const Clock: React.FC = () => {
  const now = ClockContainer.useContainer();

  const current = new Date(now);
  return (
    <p>
      {current.toString()}, {now}
    </p>
  );
};

export default Clock;
