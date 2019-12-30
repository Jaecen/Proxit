import { call, put, takeLatest } from 'redux-saga/effects'

function* generateDeckMarkers(action) {
  try {
    yield put({ type: "DECK_MARKERS_SUCCEEDED", payload: [] });
  } catch (ex) {
    console.error(ex);
    yield put({ type: "DECK_MARKERS_FAILED", payload: ex });
  }
}

export default function* deckMarkerSaga() {
  yield takeLatest("DECK_MARKERS_REQUESTED", generateDeckMarkers);
}