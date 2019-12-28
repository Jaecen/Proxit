import CardListParser from './CardListParser'
import ScryfallCardSearch from './ScyfallCardSearch'

export default async function(cardList) {
    if(cardList) {
      console.error("No card list entered.");
      return;
    }
    
    var parseResult = CardListParser(cardList);
    if(parseResult.errors.length > 0) {
      console.error(parseResult.errors);
      return;
    }
  
    console.log(parseResult.matches);

    // Build a request object
    const identifierRequest = {
      identifiers: []
    };

    parseResult.matches.map(match => identifierRequest.identifiers.push({ name: match.name, set: match.set }));
    
    // https://scryfall.com/docs/api/cards/collection
    console.log(identifierRequest);


  };

  return [];
}