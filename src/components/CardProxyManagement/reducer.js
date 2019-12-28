import ActionTypes from './actionTypes'

export default (state, action) => {
  switch(action.type) {

    case ActionTypes.card_list_updated:
      return {
        ...state,
        cardList: action.payload
      };

    case ActionTypes.card_proxies_requested:
      return state;
    
    case ActionTypes.fetch_scryfall_card_details_started:
      return state;

    case ActionTypes.fetch_scryfall_card_details_succeeded:
      return state;

    case ActionTypes.fetch_scryfall_card_details_faied:
      return state;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};