import ActionTypes from "../actionTypes";

const sampleEntry =
`4 WUBG Counters [CMDR]
4 WUBRG Warriors [CMDR]
4 UB Zombies [CMDR]
4 BR Grenzo [CMDR]
4 WBR Angels [CMDR]
4 WURB Tokens [CMDR]
4 UG Merfolk [CMDR]
4 WUG Enchantments [CMDR]
4 WBG Reanimator [CMDR]
4 UBRG Cascade [CMDR]`;

const persistedEntry = localStorage.getItem('deckList');

const initialState = {
  deckList: persistedEntry || sampleEntry,
  decks: [],
};

export default function DeckMarkerManagement(state = initialState, action) {
  switch(action.type) {

    case ActionTypes.DECK_LIST_UPDATED:
      return {
        ...state,
        deckList: action.payload
      };

    case ActionTypes.DECK_MARKERS_SUCCEEDED:
      return {
        ...state,
        decks: action.payload
      };

    default:
      return state;
  }
};
