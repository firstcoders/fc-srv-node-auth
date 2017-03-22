# Nodejs express identity server.

## NOTE: This is currently still under development.

The goal is to have a nodejs application that can generate a jwt token.
In addition some routes will be protected via an authentication layer,
but instead of node decoding the jwt token this is done via a nginx reverse
proxy.

## Installation
- Create a .env file containing the following environment variables:
- PORT=8080
- DATABASE=mongodb://connectionstring
- JWT_SECRET=yourveryownsecret

## Test
- npm run test
