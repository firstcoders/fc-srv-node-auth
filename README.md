docker run -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:7-alpine node main.js
README.md

jwt:
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
https://www.npmjs.com/package/jsonwebtoken

mongo:
https://hub.docker.com/_/mongo/
https://github.com/Automattic/mongoose/issues/3905

frameworks:

https://github.com/flywheelsports/fwsp-hydra-express/blob/master/documentation.md

HELP

curl -H "Content-Type: application/json" -X POST -d '{"username":"mark@firstcoders.co.uk","password":"password"}' http://micro.local:8080/auth/login

curl \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX192IjoiaW5pdCIsImFkbWluIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjoiJDJhJDEyJDJEc0RBdjN5RXd5dGxTek1KTmZXVC45YTg1NFh4cFNmdGZvY0FBOUpsVFo3amg4RXNFMk5PIiwidXNlcm5hbWUiOiJtYXJrQGZpcnN0Y29kZXJzLmNvLnVrIiwiX2lkIjoiNThjYWIwYzhmMDYyMjYwMDBmYmRlMTNlIn0sImlhdCI6MTQ4OTc1OTA2OCwiZXhwIjoxNDg5ODQ1NDY4fQ.yNmyoK85nwyaJ9hYr7ykG5eO5itaccvAJsPfB3QUQa4" \
    http://micro.local:8080/auth/users