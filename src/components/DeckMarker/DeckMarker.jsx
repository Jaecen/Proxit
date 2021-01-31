import React from 'react';
import { Mana } from '@saeris/react-mana';

import './DeckMarker.css';

export default function DeckMarker({ deck }) {
  const renderMarker = (index) =>
    <div key={index} className='deck-marker'>
      <div className='deck-marker-format'>
        <div className='deck-marker-format-rotation'>
          { deck.format }
        </div>
      </div>
      <div className='deck-marker-values'>
        <div className='deck-marker-values-colors'>
          {deck.colors.map((color, i) => <span key={i}><Mana symbol={color.toLowerCase()} cost />{' '}</span>)}
        </div>
        <div className='deck-marker-values-name'>
          { deck.name }
        </div>
      </div>
    </div>;

  const copies = [];
  for(let index = 0; index < deck.quantity; index++) {
    copies.push(renderMarker(index));
  }

  return copies;
}
