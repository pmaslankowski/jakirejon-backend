ARG ELASTIC_VERSION=7.10.0

FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION} AS builder

ADD addresses.json .

ENV discovery.type=single-node

RUN /usr/local/bin/docker-entrypoint.sh elasticsearch -d -E path.data=/tmp/data \
    && while [[ "$(curl -s -o /dev/null -w '%{http_code}' localhost:9200)" != "200" ]]; do sleep 1; done \
    && curl -H "Content-Type: application/json" -XPOST "localhost:9200/addresses/_bulk?pretty&refresh" \ 
        --data-binary "@addresses.json"

FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}
COPY --from=builder /tmp/data/ /usr/share/elasticsearch/data/
