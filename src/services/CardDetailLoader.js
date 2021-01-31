export default async function CardDetailLoader(parseResult) {
  // Build a request object
  const requestBody = {
    identifiers: []
  };

  parseResult.matches.map(match => requestBody.identifiers.push({ name: match.name, set: match.set }));

  console.debug("Requesting", requestBody);

  // https://scryfall.com/docs/api/cards/collection
  const response = await fetch(
    'https://api.scryfall.com/cards/collection', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

  console.debug("Response received", response);
  if(!response.ok) {
    throw new Error('Error returned from Scryfall API');
  }

  const responseBody = await response.json();
  console.debug('Response body', responseBody);

  // We can match up on index so long as all of the cards matched. Any mismatches are a failure.
  if(responseBody.not_found.length > 0) {
    const list = responseBody.not_found.map(c => `${c.name} [${c.set || 'unknown'}]`);
    throw new Error(`Missing cards:\r\n${list.join('\r\n')}`);
  }

  // Match up submitted cards with returned cards
  const scryfallResult = [];
  for(let index = 0; index < parseResult.matches.length; index++) {
    scryfallResult.push({
      requestCard: parseResult.matches[index],
      responseCard: responseBody.data[index]
    });
  }

  console.debug('Result', scryfallResult);
  return scryfallResult;
};