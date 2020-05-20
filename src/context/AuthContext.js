import { createContext, useContext } from 'react';

export const LogedIn = createContext();

export function useLogedIn() {
  return useContext(LogedIn);
}