import React from 'react';

import Actions from './actions'
import Reducer from './reducer'

import { useActions } from './actions' 
import { applySagaMiddleware } from './sagaMiddleware' 

import CardProxyList from '../CardProxyList';

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

const initialState = {
  cardList: sampleEntry,
  cards: [],
};



export default () => {
  const { state, actions } = React.useContext(CardProxyContext);

  return (
    <>
      <section className="section">
        <div className='container'>

          <div className='field'>
            <label className='label'>Card List</label>
            <div className='control'>
              <textarea
                className='textarea card-entry-list'
                rows='10'
                value={state.cardList}
                onChange={ (event) => dispatch(Actions.updateCardList(event.target.value)) } />
            </div>
          </div>

          <div className='field'>
           <div className='control'>
            <button className='button is-primary' onClick={ () => dispatch(Actions.requestCardProxies()) }>Generate Proxies</button>
            </div>
          </div>

        </div>
      </section>

      <CardProxyList cards={state.cards} />
    </>
  );
}