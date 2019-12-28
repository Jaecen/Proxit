export default async function getScryfallCard(name, set) {
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