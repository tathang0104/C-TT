import React, { useRef, useState, useEffect } from 'react'

const CountUp = ({start = 0, end, timer = 100}) => {
  const [count, setCount] = useState(null);
  const ref = useRef(start)

  const accumulator = end / 2000;

  const updateCounterState = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > end) return setCount(end);
      setCount(result); 
      ref.current = result;
    }

    setTimeout(updateCounterState, timer);
  }

  useEffect(() => {
    let isMounted =true;
    if (isMounted) updateCounterState();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [start, end]);

  return (
    <div>{count}</div>
  )
}

export default CountUp