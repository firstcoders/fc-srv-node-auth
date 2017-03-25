# Nodejs express identity server.

> NOTE: This is currently still under development.

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
The test suite contains integration tests and depends on a working mongodb instance.

```
docker run --name test-mongo -p 27017:27017 -d mongo:3.0
docker run -e "DATABASE=mongodb://test-mongo:27017/test" -v $PWD:/usr/src/app -w /usr/src/app --link test-mongo:test-mongo node:7-alpine npm run test
```

# Todo
- return cors headers
- input validation
- reset password + email
- refresh token
- logging
- i18n