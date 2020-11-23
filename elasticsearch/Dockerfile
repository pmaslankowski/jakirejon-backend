FROM docker.elastic.co/elasticsearch/elasticsearch:7.10.0

ADD addresses.json

RUN curl -H "Content-Type: application/json" -XPOST "localhost:9200/addresses/_bulk?pretty&refresh" --data-binary "@addresses.json"
