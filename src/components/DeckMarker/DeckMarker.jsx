import React from 'react';

import './DeckMarker.css';

export default function({ deck }) {
  return (
    <div class='deck-marker'>
      <div class='deck-marker-format'>
          <div class='deck-marker-format-rotation'>
              CMDR
          </div>
      </div>
      <div class='deck-marker-values'>
          <div class='deck-marker-values-colors'>
              <i class="ms ms-cost ms-w"></i>
              <i class="ms ms-cost ms-u"></i>
              <i class="ms ms-cost ms-b"></i>
              <i class="ms ms-cost ms-r"></i>
              <i class="ms ms-cost ms-g"></i>
          </div>
          <div class='deck-marker-values-name'>
              Warriors
          </div>
      </div>
    </div>
  );
}
