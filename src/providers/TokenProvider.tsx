import * as React from 'react';

import { TOKEN_STORAGE_KEY } from '@/constants/variables';
import useUpdatedEffect from '@/hooks/useUpdatedEffect';
import storage from '@/libs/storage';
import { DispatchAction } from './types';

export type TokenContextType = {
  access_token?: string;
  refresh_token?: string;
};

const INITIAL_STATE: TokenContextType = {};

export const TokenActions = {
  setTokens: 'SET_TOKENS',
};

function reducer(state: TokenContextType, action: DispatchAction<TokenContextType>) {
  switch (action.type) {
    case TokenActions.setTokens:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

const TokenContext = React.createContext<TokenContextType>({});
TokenContext.displayName = 'TokenContext';

function initToken(initialState: TokenContextType) {
  return { ...initialState, ...storage.get(TOKEN_STORAGE_KEY) };
}

const TokenDispatch = React.createContext<React.Dispatch<DispatchAction<TokenContextType>>>(() => {});
TokenDispatch.displayName = 'TokenDispatch';

export default function TokenProvider(props: React.PropsWithChildren<any>) {
  const [tokens, dispatch] = React.useReducer(reducer, INITIAL_STATE, initToken);

  useUpdatedEffect(() => {
    storage.set(TOKEN_STORAGE_KEY, tokens);
  }, [tokens]);

  return (
    <TokenDispatch.Provider value={dispatch}>
      <TokenContext.Provider value={tokens}>{props.children}</TokenContext.Provider>
    </TokenDispatch.Provider>
  );
}

export function useToken() {
  return React.useContext(TokenContext);
}

export function useTokenDispatch() {
  return React.useContext(TokenDispatch);
}
