import ohm from 'ohm-js';
/* eslint-disable import/no-webpack-loader-syntax */
import cardListGrammarText from '!!raw-loader!./cardListGrammar.ohm';
/* eslint-enable import/no-webpack-loader-syntax */

const cardListGrammar = ohm.grammar(cardListGrammarText);
const cardListSemantics = cardListGrammar
    .createSemantics()
    .addOperation('load', {
        list: function(firstLine, eol1, spaces, otherLines, eol2) {
            return [firstLine.load(), ...otherLines.load()].map((line) => ({
                quantity: parseInt(line[0]) || 1,
                name: line[1],
                set: line[2][0]
            }))
        },
        line: function(_ws1, quantity, _ws2, cardName, _ws3, setIdentifier) {
            return [quantity.load(), cardName.load(), setIdentifier.load()];
        },
        quantity: function(a) {
            return a.load().join('');
        },
        cardName: function(a) {
            var x = a.load();
            return x.join('');
        },
        setIdentifier: (_delim1, setName, _delim2) => setName.load(),
        setName: (a,b,c,d) => [a.load(),b.load(),c.load(),d.load()].join(''),
        _terminal: function() {
            return this.sourceString;
        }
    });

export default function(input) {
  if(!input) {
    return {
        errors: [`Parse failure: No input provided`],
        matches: []
    };
  }

  const match = cardListGrammar.match(input);
  if(match.failed()) {
      return {
          errors: [`Parse failure: <pre>${match.message}</pre>`],
          matches: []
      };
  }

  const result = cardListSemantics(match).load();
  return {
      errors: [],
      matches: result
  };
}