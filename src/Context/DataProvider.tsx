"use client";
import { IState } from "country-state-city";
import { createContext, ReactNode, useContext, useState } from "react";

type ContextType = {
  city: Array<IState> | null;
  changeCity: (value: Array<IState> | undefined) => void;
  conference: {
    name: string | null;
    country: string | null;
    state: string | null;
    blog: string | null;
  };
  changedata: (value: ContextType["conference"]) => void;
};

const ContextDefaultValues: ContextType = {
  city: null,
  changeCity: (value: Array<IState> | undefined) => {},
  conference: {
    name: null,
    country: null,
    state: null,
    blog: null,
  },
  changedata: (value: ContextType["conference"]) => {},
};

const Context = createContext<ContextType>(ContextDefaultValues);

export function useCon() {
  return useContext(Context);
}

type Props = {
  children: ReactNode;
};

export function Provider({ children }: Props) {
  const [city, setCity] = useState<Array<IState> | null>(null);
  const [conference, setConference] = useState<ContextType["conference"]>({
    blog: null,
    country: null,
    name: null,
    state: null,
  });

  const changedata = (value: ContextType["conference"]) => {
    setConference(value);
  };

  const changeCity = (value: Array<IState> | undefined) => {
    if (value) setCity(value);
    return;
  };
  const value = { city, changeCity, conference, changedata };
  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
}
