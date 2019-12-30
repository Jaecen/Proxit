import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateDeckList, requestDeckMarkers } from '../../actions'

import DeckMarker from '../DeckMarker';

import './DeckMarkerManagement.css';

export default () => {
  const dispatch = useDispatch();
  const selectedState = useSelector(state => state.deckMarkerManagement);

  return (
    <>
    <section className="section is-hidden-print">
      <div className='container'>

        <div className='field'>
          <label className='label'>Deck List</label>
          <div className='control'>
            <textarea
              className='textarea deck-entry-list'
              rows='10'
              value={selectedState.deckList}
              onChange={ (event) => dispatch(updateDeckList(event.target.value)) } />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
          <button className='button is-primary' onClick={ () => dispatch(requestDeckMarkers(selectedState.cardList)) }>Generate Markers</button>
          </div>
        </div>

      </div>
    </section>

    <section class='section deck-markers'>
      <div class='container'>
        <div class='deck-marker-list'>
          <DeckMarker deck={null} />
          {/* { selectedState.decks } */}
        </div>
      </div>
    </section>
  </>
  );
};