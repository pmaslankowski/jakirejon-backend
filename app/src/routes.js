import express from 'express';
import { handleGetSuggestions } from './controllers/suggestionsController';
import { handleGetAddressDetails} from './controllers/addressDetailsController';

const router = express.Router();

router.get('/suggestions', handleGetSuggestions);
router.get('/addresses', handleGetAddressDetails);

export default router;