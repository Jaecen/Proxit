
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
import React, {createContext, useReducer} from 'react';

const CardProxyContext = React.createContext();
const CardProxyProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  const actions = useActions(state, applySagaMiddleware(dispatch));

  return (
    <CardProxyContext.Provider value={ {state, actions} }>
      {children}
    </CardProxyContext.Provider>
  );
};

