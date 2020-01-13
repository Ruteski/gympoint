<h1 align="center">
   GymPoint Fullstack app
</h1>

### :rocket: Este projeto foi desenvolvido com as seguintes tecnologias:

-  [Node.js](https://nodejs.org/)
-  [Express](https://expressjs.com/pt-br/)
-  [Sequelize](https://sequelize.org/)
-  [Mongoose](https://mongoosejs.com/)
-  [ReactJS](https://reactjs.org/)
-  [React Native](https://facebook.github.io/react-native/)
-  [Redux](https://redux.js.org/)
-  [Redux-Saga](https://redux-saga.js.org/)
-  [Redux-persist](https://github.com/rt2zz/redux-persist)
-  [@rocketseat/unform](https://github.com/Rocketseat/unform)
-  [Styled-components](https://www.styled-components.com/)
-  [React-toastify](https://github.com/fkhadra/react-toastify)
-  [React Navigation](https://reactnavigation.org/)
-  [React-icons](https://react-icons.netlify.com/)
-  [Axios](https://github.com/axios/axios)
-  [Reactotron](https://infinite.red/reactotron)
-  [Immer](https://github.com/immerjs/immer)
-  [Polished](https://polished.js.org/)
-  [Yup](https://www.npmjs.com/package/yup)
-  [Bee-queue](https://github.com/bee-queue/bee-queue)
-  [Date-fns](https://date-fns.org/)
-  [Prop-types](https://www.npmjs.com/package/prop-types)
-  [ESLint](https://eslint.org/)
-  [Prettier](https://prettier.io/)
-  [WebStorm](https://www.jetbrains.com/webstorm/)
-  entre outros ... Veja o arquivo package.json para ver todas as dependências do projeto. - [backend](https://github.com/Ruteski/gympoint/blob/master/gympoint-backend/package.json) [frontend](https://github.com/Ruteski/gympoint/blob/master/gympoint-web/package.json) [mobile](https://github.com/Ruteski/gympoint/blob/master/gympoint-mobile/package.json)

## :information_source: Como rodar a aplicação localmente
### Requerimentos
Para rodar este projeto você irá precisar: [Git](https://git-scm.com), [Node.js](https://nodejs.org/) v10.15.3 or higher, [Yarn](https://yarnpkg.com/), [PostgreSQL](https://www.postgresql.org/) and [Redis](https://redis.io/) instalados em seu computador. Recomendo usar [Docker](https://www.docker.com/) para rodar seus bancos de dados.
<br>
Caso opte pelo docker, siga esses passos para instalar o docker e rodar as imagens.

```bash
# Instale a imagem do Redis
docker run --name <imageName> -p 6379:6379 -d -t redis:alpine

# Instale a imagem do Postgres (Se você não especificar um nome de usuario, por padrão será postgres)
docker run --name <imageName> -e POSTGRES_PASSWORD=yourPassword -p 5432:5432 -d postgres

# Instale a imagem do MongoDb
 docker run --name <imageName> -p 27017:27017 -d -t mongo 

# iniciar o Redis
docker start <imageName>

# iniciar o Postgres
docker start <imageName>

# iniciar o MongoDb
docker start <imageName>

# ou rode o comando que encontra-se dentro do backend
yarn start_bancos

```
Agora, clone o repositório e instale as dependências
```bash
# para clonar o repositório
git clone https://github.com/Ruteski/gympoint.git

# vá para o backend
cd gympoint/backend

# instale as dependências do backend
yarn

```
Para conectar-se ao banco de dados, você precisará inserir as informações de acesso no arquivo .env, basseado no arquivo .env.example que é fornecido na pasta de back-end, altere as variáveis ​​de acordo com o seu ambiente.
```bash
# rodando as migrations
yarn sequelize db:migrate

# rodando os seeds
yarn sequelize db:seed:all

# rodando a api
yarn dev & yarn queue

# em outra guia no terminal, instale as dependências do front-end e execute-o
cd frontend
yarn
yarn start
```
Use estas credenciais para acessar a aplicação web
<blockquote><strong>email:</strong> admin@gympoint.com</blockquote>
<blockquote> <strong>senha:</strong> 123456</blockquote>

Para o mobile, você precisa do emulador Android com o SDK instalado ou emulador IOS e o cli do react-native.

<blockquote>O projeto foi desenvolvido e testado no emulador Android</blockquote>

```bash
# instalar dependências e executar o dispositivo móvel
cd mobile
yarn

# primeiro abra o emulador e inicie o servidor do react-native
yarn start

# em outra guia, instale e execute o aplicativo
yarn android

```
<blockquote>esta parte pode ser complicada, se você encontrar algum erro, tente executar o comando: yarn start --reset-cache e o yarn android novamente.</blockquote>

## :page_facing_up: Licença

Este projeto está sob a licença MIT. Veja o [LICENÇA](https://github.com/Ruteski/gympoint/blob/master/LICENSE) para mais informações

## :mailbox_with_mail: Entre em contato em:

[LinkedIn](https://www.linkedin.com/in/lincoln-ruteski-08a57b26/)
