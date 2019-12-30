import { call, put, takeLatest } from 'redux-saga/effects'
import CardDetailLoader from '../services/CardDetailLoader'
import CardListParser from '../services/CardListParser'

// worker Saga: will be fired on CARD_PROXIES_REQUESTED actions
function* loadCardDetails(action) {
  try {
    const cardList = action.payload;

    console.debug("Parsing card list", cardList);

    if(!cardList) {
      throw new Error("No card list entered.");
    }
    
    var parseResult = CardListParser(cardList);
    if(parseResult.errors.length > 0) {
      throw new Error(parseResult.errors);
    }
  
    console.debug("Parse successful", parseResult.matches);
  
    const scryfallCardInfo = yield call(CardDetailLoader, parseResult);
    yield put({ type: "CARD_PROXIES_SUCCEEDED", payload: scryfallCardInfo });
  } catch (ex) {
    console.error(ex);
    yield put({ type: "CARD_PROXIES_FAILED", payload: ex });
  }
}

export default function* cardProxySaga() {
  yield takeLatest("CARD_PROXIES_REQUESTED", loadCardDetails);
}