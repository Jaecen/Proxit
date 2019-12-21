import React from 'react';

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

export default function DeckMarkerManagement() {
  return (
    <div class='container'>
      <div class='field'>
        <label class='label'>Deck List</label>
        <div class='control'>
          <textarea class='textarea deck-entry-list' rows='30'>
            { sampleEntry }
          </textarea>
        </div>
      </div>

      <div class='field is-grouped'>
        <div class='control deck-entry-submit-control'>
          <button class='button is-primary deck-entry-submit'>Generate Markers</button>
        </div>
      </div>
    </div>
  );
};