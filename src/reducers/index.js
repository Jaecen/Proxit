import { combineReducers } from 'redux';
import cardProxyManagement from './cardProxyManagement';
import deckMarkerManagement from './deckMarkerManagement';

export default combineReducers({ cardProxyManagement, deckMarkerManagement });
