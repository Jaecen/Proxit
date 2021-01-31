import React from 'react';
import { Mana } from '@saeris/react-mana';
import { Keyrune } from '@saeris/react-keyrune';

import './CardProxy.css';

export default function CardProxy ({ cardListEntry, scryfallEntry }) {
  const renderExtendedInfo = cardListEntry.set || false;

  const color = determineColor(scryfallEntry);

  const name =
    <div key='name' className='card-proxy-name'>
      { buildName(scryfallEntry) }
    </div>

  const type = 
    <div key='type' className='card-proxy-field card-proxy-field-type'>
      { buildType(scryfallEntry) }
    </div>

  const cost =  renderExtendedInfo
    ? <div key='cost' className='card-proxy-field card-proxy-field-cost'>
        { Array.from(buildCost(scryfallEntry)) }
      </div>
    : null;

  const symbol = renderExtendedInfo
    ? <div key='symbol' className='card-proxy-field card-proxy-field-symbol'>
        <Keyrune set={determineSet(scryfallEntry).toLowerCase()} rarity={scryfallEntry.rarity.toLowerCase()} gradient />
      </div>
    : null;

  const renderProxy = (index) => (
    <div key={index} className='card-proxy-container'>
      <div className={`card-proxy-wrapper card-proxy-wrapper-${color}`}>
        { name }  
        { type }
        <div className='card-proxy-spacer'>
        </div>
        { cost }
        { symbol }
      </div>
    </div>);

  const proxyCopies = [];
  for(let copyIndex = 0; copyIndex < cardListEntry.quantity; copyIndex++) {
    proxyCopies.push(renderProxy(copyIndex));
  }

  return proxyCopies;
}

function determineColor(scryfallEntry) {
  if((scryfallEntry.card_faces || []).length > 0) {
      return determineColor(scryfallEntry.card_faces[0]);
  }

  if(scryfallEntry.type_line.split(' ').includes('Land')) {
      return 'land';
  }

  if(!scryfallEntry.colors || scryfallEntry.colors.length === 0) {
      return 'colorless';
  }

  if(scryfallEntry.colors.length === 1) {
      if(scryfallEntry.colors[0] === 'W') {
          return 'white';
      }
  
      if(scryfallEntry.colors[0] === 'U') {
          return 'blue';
      }
  
      if(scryfallEntry.colors[0] === 'B') {
          return 'black';
      }
  
      if(scryfallEntry.colors[0] === 'R') {
          return 'red';
      }
  
      if(scryfallEntry.colors[0] === 'G') {
          return 'green';
      }
  }

  return 'multicolor';
}

function determineSet(scryfallEntry) {
  // The Keyrune set symbol for PSLD is incorrect. Use the PMEI symbol instead.
  const set = (scryfallEntry.set || '').toLowerCase();
  
  if(set === 'psld') {
    return 'pmei';
  }

  if(set === 'sld') {
    return 'pmei';
  }

  return scryfallEntry.set;
}

function buildName(scryfallEntry) {
  if((scryfallEntry.card_faces || []).length > 0) {
      return buildName(scryfallEntry.card_faces[0]);
  }

  return scryfallEntry.name;
}

function buildType(scryfallEntry) {
  if((scryfallEntry.card_faces || []).length > 0) {
      return buildType(scryfallEntry.card_faces[0]);
  }

  return scryfallEntry.type_line;
}

function* buildCost(scryfallEntry) {
  if((scryfallEntry.card_faces || []).length > 0) {
      yield * buildCost(scryfallEntry.card_faces[0]);
  }
  
  const costRegex = /\{(\w+?)\}/g;
  let m = [];
  let index = 0;
  while ((m = costRegex.exec(scryfallEntry.mana_cost)) !== null && m.length > 1) {
      yield <Mana key={index} symbol={m[1].toLowerCase()} cost />;
      index++;
  }
}
