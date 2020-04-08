import { throttle } from 'redux-saga/effects'
import ActionTypes from "../actionTypes";

function persistCardList(action) {
  window.localStorage.setItem('cardList', action.payload);
}

function persistDeckList(action) {
  window.localStorage.setItem('deckList', action.payload);
}

export default function* persistListEntries() {
  yield throttle(1000, ActionTypes.CARD_LIST_UPDATED, persistCardList);
  yield throttle(1000, ActionTypes.DECK_LIST_UPDATED, persistDeckList);
}