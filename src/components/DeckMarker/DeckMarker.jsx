import React from 'react';
import { Mana } from '@saeris/react-mana';

import './DeckMarker.css';

export default function({ deck }) {
  const count = 4;
  const format = "CMDR";
  const colors = ['w', 'u', 'b', 'r', 'g'];
  const name = 'Warriors';

  const renderMarker = (index) =>
    <div key={index} className='deck-marker'>
      <div className='deck-marker-format'>
        <div className='deck-marker-format-rotation'>
          {format}
        </div>
      </div>
      <div className='deck-marker-values'>
        <div className='deck-marker-values-colors'>
          {colors.map((color, i) => <span><Mana key={i} symbol={color} cost />{' '}</span>)}
        </div>
        <div className='deck-marker-values-name'>
          {name}
        </div>
      </div>
    </div>;

  const copies = [];
  for(let index = 0; index < count; index++) {
    copies.push(renderMarker(index));
  }

  return copies;
}
