import * as React from 'react';

import { UserProfile as User } from '@/model/user';
import { DispatchAction } from './types';

type UserContextType = User | undefined;

const UserContext = React.createContext<UserContextType>(undefined);
const UserDispatchContext = React.createContext<React.Dispatch<DispatchAction<UserContextType>>>(() => {});

const userReducer = (_: UserContextType, action: DispatchAction<UserContextType>) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      throw new Error();
  }
};

const INITIAL_STATE: UserContextType = undefined;

export default function UserProvider(props: React.PropsWithChildren) {
  const [user, dispatch] = React.useReducer(userReducer, INITIAL_STATE);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);

  if (!context) {
    throw Error('useUserDispatch must be used under UserProvider');
  }

  return context;
}

export function useUser() {
  const context = React.useContext(UserContext);

  return context;
}
