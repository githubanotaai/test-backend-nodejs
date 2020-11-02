<h1>Teste Jonathan Rodrigues Cardoso</h1>

<strong>Tecnologias usadas</strong>

Com base nos requisitos, resolvi criar uma api rest já que esse tipo de aplicação pode ser consumida por qualquer client já que utiliza json

Utilizei tecnologias que facilitasse a criação rápida:
- Arquitetura: MVC (Não completa por conta do tempo)
- Servidor: Express
- Banco de dados: SQLite
- ORM: Sequelize

Também utilizei o insomnia e o beekeeper para testar a api
 
<strong>Documentação (ou quase)</strong>

- Cadastrar produto: Utilize o método post na url “http://localhost:8080/products” com um json contendo as chaves “title”, "title", "description”, "price”, "category":
- Alterar produto: Utilize o método put na url “http://localhost:8080/products/id” no lugar de id coloque o número do id do produto a ser alterado com um json com as mesmas chaves do cadastro
- Listar tudo: Utilize o método get na url “http://localhost:8080/products”
- Listar um produto por id: Utilize o método get na url “http://localhost:8080/products/id” no lugar de id coloque o número do id do produto a ser listado
- Listar produto por nome: Utilize o método get na url “http://localhost:8080/products/?title=nome%20do%20produto” no lugar nome%20do%20produto id coloque o nome do produto a ser listado
- Listar produto por categoria: Utilize o método get na url “http://localhost:8080/products/?category=categoria%20do%20produto” no lugar categoria %20do%20produto id coloque a categoria dos produtos a serem listados
- Deletar produto por id: Utilize o método delete na url “http://localhost:8080/products/id” no lugar de id coloque o número do id do produto a ser deletado