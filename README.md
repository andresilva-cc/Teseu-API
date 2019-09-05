# Teseu-API
> API em Node.js + Express para o projeto Teseu

## Pré-requisitos 

Para executar este projeto, são necessários os seguintes softwares/ferramentas:

- Node.js
- npm (acompanha Node.js)
- PostgreSQL
- PostGIS
- PM2 (para modo produção)

## Instalação e Configuração

1. Instale as dependências com o comando `npm i`
2. Crie um banco de dados PostgreSQL e adicione a extensão PostGIS
3. Crie uma cópia do arquivo `.env.example` com o nome  `.env` e realize as seguintes configurações:
    - Defina uma porta a ser utilizada
    - Gere uma string aleatória para a configuração AUTH_SECRET
    - Configure a conexão do banco de dados
    - Adicione sua Key e Secret do Nexmo para o envio de SMS
4. Execute as migrações do banco de dados com o comando `npx sequelize db:migrate`

## Execução

- Para executar em modo de desenvolvimento com reload automático, execute o comando `npm run dev`
- Para executar no modo de produção, execute o comando `npm run start`. **Atenção**: é recomendado utilizar o PM2 para gerenciar a execução do processo.

## Outros

### Gerar token de usuário

Para gerar um token de usuário para testes, execute com o Node.js o arquivo ```./app/utils/generate_user_token.js``` passando como parâmetro o ID do usuário, como por exemplo:

```node ./app/utils/generate_user_token.js 1```

O token será retornado no terminal.

### Gerar token de admin

Para gerar um token de admin, execute com o Node.js o arquivo ```./app/utils/generate_admin_token.js``` passando como parâmetro o nome do responsável pelo token, como por exemplo:

```node ./app/utils/generate_admin_token.js andre```

O token será retornado no terminal.