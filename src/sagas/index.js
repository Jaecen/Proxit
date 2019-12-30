import { all } from 'redux-saga/effects'

import fetchScryfallCards from './fetchScryfallCards'
import generateDeckMarkers from './generateDeckMarkers'

export default function* rootSaga() {
  yield all([
    ...fetchScryfallCards(),
    ...generateDeckMarkers()
  ])
}