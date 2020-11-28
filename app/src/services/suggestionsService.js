import es from "../elasticsearch/suggestions"

export const getSuggestions = async (prefix) => {
  const addresses = await es.fetchAddressesByPrefix(prefix);
  const streets = addresses.map(addr => addr.street);
  return [ ...new Set(streets)];
}