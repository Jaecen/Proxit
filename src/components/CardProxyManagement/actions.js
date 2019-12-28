import ActionTypes from './actionTypes'

export const useActions = (state, dispatch) => ({ 

  updateCardList: cardListEntry => ({ type: ActionTypes.card_list_updated, payload: cardListEntry }),

  requestCardProxies: cardList => {
    dispatch({ type: ActionTypes.card_proxies_started });
    dispatch({ type: ActionTypes.load_card_details, payload: cardList });
  },

  requestCardProxiesSuccess: cards => ({ type: ActionTypes.card_proxies_succeeded, payload: cards }),
  requestCardProxiesFailure: error => ({ type: ActionTypes.card_proxies_failed, payload: error }),

})