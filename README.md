# crud-users
Projeto de CRUD de usuários feito em node.js e react js.

Para testar a aplicação é necessário executar os comandos do arquivo 'scripts.sql' dentro do postgres.

O arquivo 'scripts.sql' está localizado na raiz do projeto node em 'Node/server/scripts.sql'.

O usuário padrão é 'jv.desenvolve@gmail.com' e a senha '123', caso o comando de INSERT seja alterado, o login ficará de acordo com as modificações feitas pelo usuário.

Com os comandos executados, o próximo passo será, verificar as configuarações de conexão com o banco de dados no arquivo 'Node/server/src/database/DB.ts'.

LEMBRE-SE que é necessário executar o comando '> npm install' para instalar todas as dependências do projeto.

Para iniciar o servidor node.js é necessário executar o comando '> npm run start' dentro de 'Node/server/'.

Para iniciar a aplicação react js é necessário, assim como em node.js, executar o comando '> npm run start' dentro de 'React/web/'.
