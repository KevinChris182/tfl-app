import { useEffect, useState } from 'react';

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
