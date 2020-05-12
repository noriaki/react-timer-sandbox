import { useState, useEffect } from 'react';

const useClock: (initialTime?: number, interval?: number) => number = (
  initialTime = Date.now(),
  interval = 1000,
) => {
  const [now, setNow] = useState(initialTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(Date.now());
    }, interval);
    return () => clearInterval(timerId);
  }, [interval]);

  return now;
};

export default useClock;
