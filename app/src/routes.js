import express from 'express';
import { handleGetSuggestions } from './controllers/suggestionsController';

const router = express.Router();

router.get('/suggestions', handleGetSuggestions);

export default router;