import elasticsearch from 'elasticsearch';
import 'dotenv/config';

const client = new elasticsearch.Client({
  hosts: [
    process.env.ELASTIC_CS
  ]
});

client.ping({
    requestTimeout: process.env.ELASTIC_PING_TIMEOUT,
  }, error => {
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Elasticsearch is up, connected.');
    }
  }
);

export default client;