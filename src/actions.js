import ActionTypes from './actionTypes'

export const updateCardList = cardListEntry => ({ type: ActionTypes.CARD_LIST_UPDATED, payload: cardListEntry });

export const requestCardProxies = cardList => ({ type: ActionTypes.CARD_PROXIES_REQUESTED, payload: cardList });

export const updateDeckList = deckListEntry => ({ type: ActionTypes.DECK_LIST_UPDATED, payload: deckListEntry });

export const requestDeckMarkers = deckList => ({ type: ActionTypes.DECK_MARKERS_REQUESTED, payload: deckList });
