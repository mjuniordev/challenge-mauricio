# Informações
- A Api foi construída em **NodeJS** com o **Express** como *framework*

- A Api utiliza **MongoDB** como *Base de dados*

- Os arquivos **.env** da API **não** foram adicionados ao arquivo **.gitignore** para melhor entendimento da arquitetura

- A API utiliza **JWT** para o gerenciamento de autenticação e criação de sessão do usuário com duração de 24 horas

- API possui uma rota com o **Swagger** para facilitar os testes diretos aos endpoints

+ **Importante:** Com exceção da rota de Criação de usuário, todas as outras rotas que precisam que o CPF seja passado no Body da requisição irão busca-lo automaticamente na sessão criada ao efetuar login, fazendo assim com que a necessidade de passar este parâmetro não seja nao necessária. 

# Instalação
* **npm install**

# Scripts
- **npm run dev** - *(Watch)*

- **docker-compose up** - *(Ambiente completo)*

# Testes
- **npm run test** - *(Unitários)*

- **npm run test:integration** - *(Integrados)*

# Usuário Default
- User: mauricio-boticario@teste.com

- Pass: 123321

# Rotas
- Swagger - GET: http://localhost:8080/api

- Criar usuário - POST: http://localhost:8080/user/create
- Login do usuário - POST: http://localhost:8080/user/login

- Cadastrar nova compra - POST: http://localhost:8080/purchase/create
- Atualizar compra cadastrada - PUT: http://localhost:8080/purchase/:id
- Deletar compra cadastrada - DELETE: http://localhost:8080/purchase/:id
- Listar todas as compras cadastradas - GET: http://localhost:8080/purchase  

- Listar cashbacks acumulados - GET: http://localhost:8080/cashback

# POST: Criar usuário
- **Body exemplo:**  
{  
	"name": "Usuario para caso de uso",  
	"cpf": "15350946051",  
	"email": "superusuario2@teste.com",  
	"password": "123456"  
}

# POST: Login do usuário
- **Body exemplo:**  
{    
	"email": "superusuario2@teste.com",  
	"password": "123456"    
}

# POST: Cadastrar nova compra
- **Header:**  
Authorization: *token* (Token do Login)

- **Body exemplo:**  
{    
	"code": "00005",  
	"price": "1000",  
	"purchaseDate": "20/04/2021"  
}

# PUT: Atualizar compra cadastrada
- **Header:**  
Authorization: *token* (Token do Login)

- **Param exemplo:**  
id: _id da compra cadastrada

- **Body exemplo:**  
{    
	"code": "00005",  
	"price": "1000",  
	"purchaseDate": "20/04/2021"  
}

# DELETE: Deletar compra cadastrada
- **Header:**  
Authorization: *token* (Token do Login)

- **Param exemplo:**  
id: _id da compra cadastrada

# GET: Listar todas as compras cadastradas
- **Header:**  
Authorization: *token* (Token do Login)

- **Param exemplo:**  
Nenhum

- **Body exemplo:**  
{ }

# GET: Listar cashbacks acumulados
- **Header:**  
Authorization: *token* (Token do Login)

- **Param exemplo:**  
Nenhum

- **Body exemplo:**  
{ }