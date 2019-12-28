import React from 'react';


function determineColor(card) {
  if((card.card_faces || []).length > 0) {
      return determineColor(card.card_faces[0]);
  }

  if(card.type_line.split(' ').includes('Land')) {
      return 'land';
  }

  if(!card.colors || card.colors.length === 0) {
      return 'colorless';
  }

  if(card.colors.length === 1) {
      if(card.colors[0] === 'W') {
          return 'white';
      }
  
      if(card.colors[0] === 'U') {
          return 'blue';
      }
  
      if(card.colors[0] === 'B') {
          return 'black';
      }
  
      if(card.colors[0] === 'R') {
          return 'red';
      }
  
      if(card.colors[0] === 'G') {
          return 'green';
      }
  }

  return 'multicolor';
}

function buildName(card) {
  if((card.card_faces || []).length > 0) {
      return buildName(card.card_faces[0]);
  }

  return card.name;
}

function buildType(card) {
  if((card.card_faces || []).length > 0) {
      return buildType(card.card_faces[0]);
  }

  return card.type_line;
}

function buildSymbol(card) {
  const i = document.createElement('i');
  i.setAttribute('class', `ss ss-${card.set.toLowerCase()} ss-${card.rarity.toLowerCase()} ss-grad`);

  return i;
}

function* buildCost(card) {
  if((card.card_faces || []).length > 0) {
      yield * buildCost(card.card_faces[0]);
  }
  
  const costRegex = /\{(\w+?)\}/g;
  let m = [];
  while ((m = costRegex.exec(card.mana_cost)) !== null && m.length > 1) {
      const i = document.createElement('i');
      i.setAttribute('class', `ms ms-${m[1].toLowerCase()} ms-cost`);
      yield i;
  }
}

const initialCardDetail = {
  state: 'new',
  name: '',
  type: '',
  cost: '',
  symbol: '',
};

export default function(cardInfo) {
  const [cardDetail, setCardDetail] = React.useState(initialCardDetail);

  if(cardDetail.state === 'new') {
    
  }
  // const card = await ScryfallCardSearch(cardInfo.name, cardInfo.set);
  // if(!card) {
  //     errors.push(`Could not find "${cardInfo.name}" and set "${cardInfo.set}"`);
  //     continue;
  // }

  // const color = determineColor(card);
  // const name = buildName(card);
  // const type = buildType(card);
  // const symbol = buildSymbol(card);
  // const cost = Array.from(buildCost(card));

  // for(let copyIndex = 0; copyIndex < cardInfo.quantity; copyIndex++) {
  //     const cardProxy = document.createElement('card-proxy');
  //     cardProxy.setAttribute('border', color);
  //     cardProxyList.appendChild(cardProxy);
      
  //     const nameSlot = document.createElement('span');
  //     cardProxy.appendChild(nameSlot);
  //     nameSlot.setAttribute('slot', 'card-name');
  //     nameSlot.textContent = name;
      
  //     // Only include extra details if the box is checked and a set was specified
  //     if(includeExtraInfo && cardInfo.set) {
  //         const costSlot = document.createElement('span');
  //         cardProxy.appendChild(costSlot);
  //         costSlot.setAttribute('slot', 'card-cost');
  //         for(let costElement of cost) {
  //             costSlot.appendChild(costElement.cloneNode(true));
  //         }
          
  //         const typeSlot = document.createElement('span');
  //         cardProxy.appendChild(typeSlot);
  //         typeSlot.setAttribute('slot', 'card-type');
  //         typeSlot.textContent = type;
                  
  //         const symbolSlot = document.createElement('span');
  //         cardProxy.appendChild(symbolSlot);
  //         symbolSlot.setAttribute('slot', 'card-symbol');
  //         symbolSlot.appendChild(symbol.cloneNode(true));
  //         }
  // }

  if(cardDetail.state === 'errored') {
    return (
      <div className='card-proxy-container'>
        <div className='card-proxy-wrapper'>
          Errored
        </div>
      </div>);
}
  
  if(!cardDetail.state === 'loading') {
    return (
      <div className='card-proxy-container'>
        <div className='card-proxy-wrapper'>
          Loading...
        </div>
      </div>);
  }

  return(
    <div className='card-proxy-container'>
      <div className='card-proxy-wrapper'>
        <div className='card-proxy-name'>
          <slot name='card-name' />
        </div>
        <div className='card-proxy-field card-proxy-field-type'>
          <slot name='card-type' />
        </div>
        <div className='card-proxy-spacer'>
        </div>
        <div className='card-proxy-field card-proxy-field-cost'>
          <slot name='card-cost' />
        </div>
        <div className='card-proxy-field card-proxy-field-symbol'>
          <slot name='card-symbol' />
        </div>
      </div>
    </div>
  );
}