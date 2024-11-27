## Instalação

### Backend

1. Clone o repositório:

   git clone https://github.com/SamuelMauli/Aula-Quarta
   cd projeto

2. Navegue até o diretório `backend`:

   cd Backend

3. Instale as dependências do backend:

   npm install

4. Inicie o servidor backend:

   npx nodemon app.js

O backend estará rodando em `http://localhost:8080`.

---

### Frontend

1. Navegue até o diretório `frontend`:

   cd Frontend

2. Instale as dependências do frontend:

   npm install

3. Inicie o servidor frontend:

   npm run dev

O frontend estará rodando em alguma porta fornecida pelo terminal.

## Estrutura do Projeto

- **backend/**
  - Contém a API, controladores, serviços e configuração do banco de dados.
  
- **frontend/**
  - Contém a interface do usuário construída com React.

## Funcionalidades

### Backend

- Autenticação de usuários via JWT.
- CRUD para produtos.
- Carrinho de compras.
- Sistema de pagamento via Pix e Cartão de Crédito.

### Frontend

- Tela de login e cadastro de usuários.
- Página de listagem de produtos.
- Página do carrinho de compras.
- Integração com os métodos de pagamento (Pix e Cartão de Crédito).

## Como Usar

1. Após iniciar o backend e frontend, acesse o frontend.
2. Faça login ou crie uma nova conta.
3. Adicione produtos ao carrinho e escolha o método de pagamento.
