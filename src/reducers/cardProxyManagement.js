import ActionTypes from "../actionTypes";

const sampleEntry =
`1 Acidic Slime [CMD]
1 Grave Pact [CMD]
1 Command Tower [C13]
1 Cyclonic Rift [C14]
1 Sun Titan [C15]
1 Sol Ring [C16]
1 Chaos Warp [C17]
1 Thantis the War Weaver [C18]
1 Arlinn Kord [SOI]`;

const persistedEntry = localStorage.getItem('cardList');

const initialState = {
  cardList: persistedEntry || sampleEntry,
  cards: [],
};

export default function CardProxyManagement(state = initialState, action) {
  switch(action.type) {

    case ActionTypes.CARD_LIST_UPDATED:
      return {
        ...state,
        cardList: action.payload
      };

    case ActionTypes.CARD_PROXIES_SUCCEEDED:
      return {
        ...state,
        cards: action.payload
      };

    default:
      return state;
  }
};
