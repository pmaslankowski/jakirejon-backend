import client from './connection';
import { mapToAddress } from './mapper';
import 'dotenv/config';

const fetchAddressesByPrefix = async prefix => {
  const query = {
    "query": {
      "match": {
        "street": {
          "query": prefix,
          "fuzziness": "AUTO",
          "operator": "and"
        }
      }
    }
  };

  const { hits } = await client.search({ index: 'addresses', size: 20, body: query });
  return hits.hits
    .filter(hit => hit._score > process.env.ELASTIC_SUGGESTION_THRESHOLD)
    .map(mapToAddress);
};

export default { fetchAddressesByPrefix };