# Nodejs express identity server.

> NOTE: This project is incomplete and has been discontinued. 

The goal is to have a nodejs application that can generate a jwt token.
In addition some routes will be protected via an authentication layer,
but instead of node decoding the jwt token this is done via a nginx reverse
proxy.

## Installation

### Create a .env file containing the following environment variables:
- PORT=8080
- DATABASE=mongodb://connectionstring
- JWT_SECRET=yourveryownsecret

## Test
The test suite contains integration tests and depends on a working mongodb instance and a working rabbitmq instance.

```
docker run \
    --rm \
    --name test-mongo \
    -p 27017:27017 \
    -d mongo

docker run \
    --rm \
    --name test-rabbitmq \
    -i \
    -t \
    -p 5671:5671 \
    -p 5672:5672 \
    -h test-rabbitmq \
    -e RABBITMQ_DEFAULT_PASS=pass \
    -e RABBITMQ_DEFAULT_USER=user \
    -e RABBITMQ_DEFAULT_VHOST=vhost \
    rabbitmq:alpine

docker run \
    --rm \
    -i \
    -t \
    -e "DATABASE=mongodb://test-mongo:27017/test" \
    -e "BROKER_URL=amqp://user:pass@test-rabbitmq:5672/vhost" \
    -v $PWD:/usr/src/app \
    -w /usr/src/app \
    --link test-mongo:test-mongo \
    --link test-rabbitmq:test-rabbitmq \
    node:7-alpine \
    npm run test
```

# Todo
- return cors headers
- input validation
- reset password + email
- refresh token
- logging
- i18n
