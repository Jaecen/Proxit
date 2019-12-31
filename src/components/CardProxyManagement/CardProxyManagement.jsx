import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCardList, requestCardProxies } from '../../actions'

import CardProxyList from '../CardProxyList';

export default () => {
  const dispatch = useDispatch();
  const selectedState = useSelector(state => state.cardProxyManagement);

  return (
    <>
      <section className="section is-hidden-print">
        <div className='container'>

          <div className='field'>
            <label className='label'>Card List</label>
            <div className='control'>
              <textarea
                className='textarea card-entry-list'
                rows='10'
                value={selectedState.cardList}
                onChange={ (event) => dispatch(updateCardList(event.target.value)) } />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
            <button className='button is-primary' onClick={ () => dispatch(requestCardProxies(selectedState.cardList)) }>Generate Proxies</button>
            </div>
          </div>

        </div>
      </section>

      <CardProxyList cards={selectedState.cards} />
    </>
  );
}