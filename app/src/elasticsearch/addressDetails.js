import client from './connection';
import { mapToAddress } from './mapper';
import 'dotenv/config';

const fetchAddressDetails = async address => {
  const query = {
    "query":{
      "match":{
        "street":{
          "query": address,
          "operator":"and"
        }
      }
    }
  };

  const { hits } = await client.search({ index: 'addresses', size: 100, body: query });
  return hits.hits
    .map(mapToAddress);
};
  
export default { fetchAddressDetails };