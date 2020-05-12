import React from 'react';

import useClock from '~/hooks/useClock';

const Clock = () => {
  const now = useClock();

  const current = new Date(now);
  return (
    <p>
      {current.toString()}, {now}
    </p>
  );
};

export default Clock;
