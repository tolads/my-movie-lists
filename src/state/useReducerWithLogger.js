/* eslint-disable no-console */
import { useEffect, useReducer } from 'react';

const log = process.env.NODE_ENV !== 'production';

const useReducerWithLogger = (reducer, defaultState, name) => {
  const [state, originalDispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (log) console.log(name, defaultState);
  }, [defaultState, name]);

  const dispatch = action => {
    if (log) {
      console.log(name, action.type, {
        action,
        prevState: state,
        nextState: reducer(state, action),
      });
    }
    originalDispatch(action);
  };

  return [state, dispatch];
};

export default useReducerWithLogger;
