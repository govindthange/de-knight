import {useEffect} from 'react';

function useUpdateLogger(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);

  return [value];
}

export default useUpdateLogger;
