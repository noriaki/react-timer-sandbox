import { useState, useEffect } from 'react';

const useClock: (interval?: number) => number = (interval = 1000) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(Date.now());
    }, interval);
    return () => clearInterval(timerId);
  }, [interval]);

  return now;
};

export default useClock;
