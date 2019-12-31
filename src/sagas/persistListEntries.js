import { throttle } from 'redux-saga/effects'
import ActionTypes from "../actionTypes";

function persistCardList(action) {
  console.log('Persisting card list');
  window.localStorage.setItem('cardList', action.payload);
}

function persistDeckList(action) {
  console.log('Persisting deck list');
  window.localStorage.setItem('deckList', action.payload);
}

export default function* persistListEntries() {
  yield throttle(1000, ActionTypes.CARD_LIST_UPDATED, persistCardList);
  yield throttle(1000, ActionTypes.DECK_LIST_UPDATED, persistDeckList);
}