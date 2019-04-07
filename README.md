# calendario-escolar

Projeto desenvolvido na disciplina de Desenvolvimento de Aplicaçes Distribuídas.


## Estrutura do Projeto
![](images/diretorios.png)
O Projeto é divido em dois diretórios principais (ambos diretórios utilizam a linguagem JavaScript,): backend e frontend.

O backend foi desenvolvido utilizando tecnologias como Express.js (para criação do servidor) e Mongoose (modelagem dos dados e consultas ao banco de dados). Dentro da pasta backend o arquivo index.js é responsável por carregar as dependências, conectar com o banco de dados e inicializar o servidor. Ainda nesse diretório a pasta api contém a API REST do servidor, cada entidade do sistema possui um diretório próprio que contém 3 arquivos: entidade.model.js, entidade.routes.js e entidade.api.js.