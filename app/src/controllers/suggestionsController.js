import createError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { getSuggestions } from '../services/suggestionsService';

export const handleGetSuggestions = asyncHandler(async (req, res) => {
  const prefix = req.query.prefix;
  if (!prefix) {
    throw createError(400, "Request parameter: 'prefix' is required");
  }
  const suggestions = await getSuggestions(prefix);
  res.send(suggestions);
});