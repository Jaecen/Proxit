import ohm from 'ohm-js';
/* eslint-disable import/no-webpack-loader-syntax */
import cardListGrammarText from '!!raw-loader!./cardListGrammar.ohm';
/* eslint-enable import/no-webpack-loader-syntax */

const cardListGrammar = ohm.grammar(cardListGrammarText);
const cardListSemantics = cardListGrammar.createSemantics()
    .addOperation('load', {
        list: function(firstLine, eol1, spaces, otherLines, eol2) {
            return [firstLine.load(), ...otherLines.load()].map((line) => ({
                quantity: parseInt(line[0]) || 1,
                name: line[1],
                set: line[2][0]
            }))
        },
        line: function(leadingWhitespace, quantity, spaces1, cardName, spaces2, setName) {
            return [quantity.load(), cardName.load(), setName.load()];
        },
        quantity: function(a) {
            return a.load().join('');
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
            return this.sourceString;
        }
    });

export default function(input) {
  if(!input) {
    return [`Parse failure: No input provided`];
  }

  const match = cardListGrammar.match(input);

  if(match.failed()) {
      return [`Parse failure: <pre>${match.message}</pre>`];
  }

  const result = cardListSemantics(match).load();
  return result;
}