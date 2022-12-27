server
  npm init -y
  npm i typescript -D
  npx tsc --init
  npm i fastify
  npm i @fastify/cors
  npm i tsx -D // compila e executa

  npm i prisma -D
  npm i @prisma/client
  npx prisma init --datasource-provider SQLite
  npx prisma migrate dev
  npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
  npx prisma generate

web
  npx create-next-app@latest --use-npm