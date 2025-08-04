# Projeto Fullstack: Cardápio Digital

Este projeto demonstra a criação de uma aplicação fullstack para gerenciamento de um cardápio digital, permitindo a listagem e adição de novos itens. O backend é desenvolvido com Java Spring Boot e o frontend com React. A persistência de dados é realizada utilizando PostgreSQL, gerenciado via Docker, e a validação das APIs é feita com Postman.

<img width="1845" height="882" alt="image" src="https://github.com/user-attachments/assets/8e14e9a6-13c8-428b-a7fb-a79e4906df1b" />
<img width="1845" height="882" alt="image" src="https://github.com/user-attachments/assets/47bc120e-1190-49d3-92fd-2fc3b62722ad" />
<img width="1837" height="863" alt="image" src="https://github.com/user-attachments/assets/8d07cde3-86b4-4c3b-a047-451dd279753d" />


## Tecnologias Utilizadas

### Backend

* Java 17
* Spring Boot 3.5.4
* Maven
* Spring Data JPA
* PostgreSQL Driver
* Lombok

### Frontend

* React 19
* Node.js (para npm)
* HTML5
* CSS3
* TypeScript

### Banco de Dados

* PostgreSQL
* Docker

### Ferramentas de Desenvolvimento

* Postman (para teste de API)
* IDE de sua preferência (usei o VS Code)

## Configuração do Ambiente

### 1. Configuração do Banco de Dados PostgreSQL com Docker

Para iniciar o banco de dados PostgreSQL utilizando Docker, execute o seguinte comando no seu terminal:

```bash
docker run --name postgres-api \
  -e POSTGRES_DB=food \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=123456 \
  -p 5432:5432 \
  -d postgres:latest
```

Este comando irá:
* Criar um contêiner Docker chamado `postgres-api`.
* Definir as variáveis de ambiente para o banco de dados (`POSTGRES_DB=food`), usuário (`POSTGRES_USER=root`) e senha (`POSTGRES_PASSWORD=123456`).
* Mapear a porta `5432` do contêiner para a porta `5432` da sua máquina local.
* Rodar a imagem `postgres:latest` em modo *detached* (`-d`).

Para acessar o terminal interativo do PostgreSQL dentro do contêiner e verificar as tabelas ou dados, utilize:

```bash
docker exec -it postgres-api psql -U root -d food
```

Dentro do terminal `psql`, você pode usar comandos como:

* `\dt` - para listar as tabelas existentes.
* `SELECT * FROM food;` - para consultar dados da tabela.

### 2. Configuração do Backend (Java Spring Boot)

1. Clone o repositório do projeto backend.
2. Navegue até o diretório raiz do projeto backend.
4. Compile e execute a aplicação Spring Boot:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   A aplicação estará disponível em `http://localhost:8080`.

### 3. Configuração do Frontend (React)

1. Navegue até o diretório raiz do projeto frontend.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Executar o projeto:

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:5173`.
