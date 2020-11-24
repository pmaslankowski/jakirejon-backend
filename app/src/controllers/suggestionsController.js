
import { fetchSuggestions } from '../services/suggestionsService';

export const getSuggestions = async (req, res) => {
  const prefix = req.query.prefix;
  const suggestions = await fetchSuggestions(prefix);
  res.send(suggestions);
};