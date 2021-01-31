import ohm from 'ohm-js';
/* eslint-disable import/no-webpack-loader-syntax */
import grammarText from '!!raw-loader!./deckListGrammar.ohm';
/* eslint-enable import/no-webpack-loader-syntax */

const grammar = ohm.grammar(grammarText);
const semantics = grammar
    .createSemantics()
    .addOperation('load', {
      list: (firstLine, _eol1, _spaces, otherLines, _eol2) =>
        [firstLine.load(), ...otherLines.load()].map((line) => ({
            quantity: parseInt(line[0]) || 1,
            colors: line[1],
            name: line[2],
            format: line[3]
        })),
      line: function(_ws1, quantity, _ws2, name, _ws3, colors, _ws4, format) {
          return [quantity.load(), name.load(), colors.load(), format.load()];
      },
      quantity: (a) => a.load().join(''),
      name: (a) => a.load().join(''),
      format: (_openingBracket, a,b,c,d, _closingBracket) => [a.load(), b.load(), c.load(), d.load()].join(''),
      _terminal: function() {
        return this.sourceString;
    }
});

export default function DeckListParser(input) {
  if(!input) {
    return {
        errors: [`Parse failure: No input provided`],
        matches: []
    };
  }

  const match = grammar.match(input);
  if(match.failed()) {
      return {
          errors: [`Parse failure: <pre>${match.message}</pre>`],
          matches: []
      };
  }

  const result = semantics(match).load();
  return {
      errors: [],
      matches: result
  };
}