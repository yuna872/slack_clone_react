import { Dispatch, SetStateAction, useCallback, useState } from "react";

type returnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): returnTypes<T> => {
  const [value, setValue] = useState(initialData);

  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
