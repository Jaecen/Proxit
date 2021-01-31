import React from 'react';

import CardProxy from '../CardProxy'

import './CardProxyList.css';

export default function CardProxyList({cards}) {
  return(
    <section className='section card-proxies'>
      <div className='container'>
        <div className='card-proxy-list'>
          {cards.map((card, index) =>
            <CardProxy key={index} cardListEntry={card.requestCard} scryfallEntry={card.responseCard} />
          )}
        </div>
      </div>
    </section>
  );
}