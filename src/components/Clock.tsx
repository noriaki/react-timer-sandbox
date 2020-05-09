import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const current = new Date(now);
  return (
    <p>
      {current.toString()}, {now}
    </p>
  );
};

export default Clock;
