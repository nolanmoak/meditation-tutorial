import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type TimerContextType = {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType>({
  duration: 10,
  setDuration: () => {},
});

type TimerProviderProps = {
  children: ReactNode;
};

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [duration, setDuration] = useState(10);

  return <TimerContext.Provider value={{ duration, setDuration }}>{children}</TimerContext.Provider>;
};

export default TimerProvider;

export const useTimer = () => useContext(TimerContext);
