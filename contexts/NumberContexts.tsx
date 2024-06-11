// context/NumberContext.tsx
import React, { createContext, useState, ReactNode, FC } from 'react';

interface KeyValuePair {
  key: number;
  value: number;
}

interface NumberContextProps {
  data: KeyValuePair[]; // data is an array of key-value pairs where both key and value are numbers
  addData: (key: number, value: number) => void; // function to add data
}

export const NumberContext = createContext<NumberContextProps | undefined>(undefined);

interface NumberProviderProps {
  children: ReactNode;
}

export const NumberProvider: FC<NumberProviderProps> = ({ children }) => {
  const [data, setData] = useState<KeyValuePair[]>([]); // Initialize data as an empty array

  // Function to add data
  const addData = (key: number, value: number) => {
    setData(prevData => [...prevData, { key, value }]);
  };

  return (
    <NumberContext.Provider value={{ data, addData }}>
      {children}
    </NumberContext.Provider>
  );
};
