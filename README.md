<h1>test-backend-nodejs</h1>

Esse projeto está sendo executado com docker, para fazer com que o projeto funcione na sua máquina, garanta que ela tenha o docker instalado. O ambiente de teste deste projeto está sendo executado fora do ambiente disponibilizado pelo docker então garanta que em sua máquina também tenha instalado o node.

Neste projeto existem dois ambientes disponibilizados pelo docker, o arquivo “docker-compose.yaml” é o ambiente de produção do projeto, ele deverá ser executado para iniciar a API e disponibilizar as rotas. O arquivo “docker-compose-dev.yaml” disponibiliza o ambiente de testes do projeto, ele deve ser executado para que seja possível realizar os testes unitários.

Instruções do ambiente de produção:

1- Para iniciar API execute o comando “docker-compose up –build”

2- Espere o container ser construído

3- Assim que a API estiver rodando use algum programa para fazer as requisições das rotas (recomendo o postman)

Instruções do ambiente de testes:

1- Antes de iniciar o ambiente de testes garanta que o ambiente de produção esteja desativado.Para desativar o ambiente de produção execute o comando “docker-compose down”

2- Para iniciar o ambiente de testes execute o comando “docker-compose -f docker-compose-dev.yaml up --build”

3- Aguarde o container ser construído

4- Execute o comando “npm i ” para baixar o pacote de dependência necessário para executar os testes.

5- Assim que o ambiente de testes estiver disponível abra um outro terminal na mesma pasta do projeto e execute o comando “npm run test”.

6- Após o comando ser executado, os testes vão ser feitos automaticamente e os resultados vão ser imprimidos no terminal.

Observações:

Neste projeto o arquivo .env foi passado para o repositório apenas para facilitar a execução e o teste da API.

A versão que foi utilizada do docker para a execução deste projeto localmente é a 20.10.16

Neste projeto existem dois banco de dados , um de teste e outro de produção. Sendo assim, os arquivos criados no ambiente de produção não ficam disponíveis no banco de testes assim como os arquivos gerados pelo ambiente de testes não ficam disponíveis no banco de produção
