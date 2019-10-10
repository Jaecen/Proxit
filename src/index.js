customElements.define('card-proxy',
    class extends HTMLElement {
        constructor() {
            super();

            const template = document.querySelector('#cardProxyTemplate');
            const shadowRoot = this
                .attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true));
        }
    });

const cardListGrammar = ohm.grammarFromScriptElement();
const cardListSemantics = cardListGrammar.createSemantics()
    .addOperation('load', {
        list: function(firstLine, eol1, spaces, otherLines, eol2) {
            return [firstLine.load(), ...otherLines.load()].map((line) => ({
                quantity: parseInt(line[0][0]) || 1,
                name: line[1],
                set: line[2][0]
            }))
        },
        line: function(leadingWhitespace, quantity, spaces1, cardName, spaces2, setName) {
            return [quantity.load(), cardName.load(), setName.load()];
        },
        cardName: function(a) {
            var x = a.load();
            return x.join('');
        },
        setName: function(a,b,c,d,e) {
            var x = [b.load(), c.load(), d.load()];
            return x.join('');
        },
        _terminal: function() {
            return this.sourceString;``
        }
    });

const cardEntryList = document.querySelector('.card-entry-list');
const cardEntrySubmitButton = document.querySelector('.card-entry-submit');
const cardEntryIncludeExtraInfoCheckbox = document.querySelector('.include-extra-info');

cardEntrySubmitButton.addEventListener('click', function() {
    const includeExtraInfo = cardEntryIncludeExtraInfoCheckbox.checked;
    const match = cardListGrammar.match(cardEntryList.value);
    if(match.failed()) {
        console.error('Parse failure', match.message);
        return;
    }
    const result = cardListSemantics(match).load();
    generateProxies(result, includeExtraInfo);
});

async function getScryfallCard(name, set) {
    if(!name) {
        return null;
    }

    let url = `https://api.scryfall.com/cards/named?exact=${name}`;
    if(set) {
        url += `&set=${set}`
    }

    const response = await fetch(url);
    if(!response.ok) {
        return null;
    }

    return await response.json();
}

async function generateProxies(cards, includeExtraInfo) {
    while(cardProxyList.firstChild) {
        cardProxyList.removeChild(cardProxyList.firstChild);
    }

    // Iterate through each card, look up the details, and write it out on the grid
    for(let cardInfo of cards) {
        const card = await getScryfallCard(cardInfo.name, cardInfo.set);

        const symbol = buildSymbol(card.set, card.rarity);
        const cost = Array.from(buildCost(card.mana_cost));

        for(let copyIndex = 0; copyIndex < cardInfo.quantity; copyIndex++) {
            const cardProxy = document.createElement('card-proxy');
            cardProxyList.appendChild(cardProxy);
            
            const nameSlot = document.createElement('span');
            cardProxy.appendChild(nameSlot);
            nameSlot.setAttribute('slot', 'card-name');
            nameSlot.textContent = card.name;
            
            if(includeExtraInfo) {
                const costSlot = document.createElement('span');
                cardProxy.appendChild(costSlot);
                costSlot.setAttribute('slot', 'card-cost');
                for(let costElement of cost) {
                    costSlot.appendChild(costElement.cloneNode(true));
                }
                
                const typeSlot = document.createElement('span');
                cardProxy.appendChild(typeSlot);
                typeSlot.setAttribute('slot', 'card-type');
                typeSlot.textContent = card.type_line;
                        
                const symbolSlot = document.createElement('span');
                cardProxy.appendChild(symbolSlot);
                symbolSlot.setAttribute('slot', 'card-symbol');
                symbolSlot.appendChild(symbol.cloneNode(true));
                }
        }
    }
}

function buildSymbol(set, rarity) {
    const i = document.createElement('i');
    i.setAttribute('class', `ss ss-${set.toLowerCase()} ss-${rarity.toLowerCase()} ss-grad`);

    return i;
}

function* buildCost(cost) {
    const costRegex = /\{(\w+?)\}/g;
    while ((m = costRegex.exec(cost)) !== null && m.length > 1) {
        const i = document.createElement('i');
        i.setAttribute('class', `ms ms-${m[1].toLowerCase()} ms-cost`);
        yield i;
    }
}