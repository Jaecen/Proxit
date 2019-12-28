import ActionTypes from './actionTypes'

import CardDetailLoader from '../../services/CardDetailLoader'

export const applySagaMiddleware = dispatch =>
  async action => { 
    switch (action.type) { 

      case ActionTypes.load_card_details:
        try {
          const result = await CardDetailLoader(action.payload);
          return dispatch({
            type: ActionTypes.card_proxies_succeeded,
            payload: result
          });
        }
        catch (error) {
          return dispatch({
            type: ActionTypes.card_proxies_failed,
            payload: error
          });
        }
      
      default:
        dispatch(action);
  }
}