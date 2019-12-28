import React from 'react';

import CardProxy from '../CardProxy'

export default function({cards}) {
  return(
    <section className='section card-proxies'>
      <div className='container'>
        <div className='card-proxy-list'>
          {cards.map((card, index) =>
            <CardProxy key={index} card={card} />
          )}
        </div>
      </div>
    </section>
  );
}