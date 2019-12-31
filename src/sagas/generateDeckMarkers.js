import { put, takeLatest } from 'redux-saga/effects'
import DeckListParser from '../services/DeckListParser'
import ActionTypes from "../actionTypes";

function* generateDeckMarkers(action) {
  try {
    if(!action.payload) {
      throw new Error("No card list entered.");
    }
    
    var parseResult = DeckListParser(action.payload);
    if(parseResult.errors.length > 0) {
      throw new Error(parseResult.errors);
    }
    
    yield put({ type: ActionTypes.DECK_MARKERS_SUCCEEDED, payload: parseResult.matches });
  } catch (ex) {
    console.error(ex);
    yield put({ type: ActionTypes.DECK_MARKERS_FAILED, payload: ex });
  }
}

export default function* deckMarkerSaga() {
  yield takeLatest(ActionTypes.DECK_MARKERS_REQUESTED, generateDeckMarkers);
}