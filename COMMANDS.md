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
  npm run prisma generate
  npm run prisma db seed

web
  npx create-next-app@latest --use-npm
  npm i -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p 

mobile
  npm i -g expo-cli
  npx create-expo-app nlw-copa
  expo start

  npm i native-base
  expo install react-native-svg
  expo install react-native-safe-area-context@3.3.2
  npx expo install expo-font @expo-google-fonts/roboto
  npm i react-native-svg-transformer
  npm i @react-navigation/native
  
  npx expo install expo-auth-session expo-random
  npx expo install expo-web-browser 

  npm i --save phosphor-react-native

  https://docs.expo.dev/versions/latest/sdk/auth-session/#what-authexpoio-does-for-you
  https://auth.expo.io/@your-username/your-app-slug
  @enzoglauber
  expo login