curl --silent localhost:3000/heroes
#"results":[{"id":"dfff4dc8-e402-4c37-bbb9-3ff149f100dd","name":"Batman","age":50,"power":"rich"}]
curl \
  --silent \
  -X POST \
  -d '{"name": "Flash", "age": 28, "power": "speed"}' \
  localhost:3000/heroes
#{"id":"d3332014-204d-4e02-a30c-8b4ee989a293","success":"User created successfully"}
curl \
  --silent \
  -X POST \
  -d '{"invalid payload"}' \
  localhost:3000/heroes
#{"error":"internal sever error!!"}