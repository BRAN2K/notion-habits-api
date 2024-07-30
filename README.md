# Notion Habits API

Esta é uma API construída em Node.js com TypeScript para marcar hábitos diários como concluídos no Notion a partir da leitura de códigos QR.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/notion-habits-api.git
   cd notion-habits-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` e configure as variáveis de ambiente:

   ```env
   NOTION_TOKEN=seu_token_do_notion
   NOTION_DATABASE_ID=seu_database_id_do_notion
   PORT=3000
   ```

4. Execute o servidor:
   ```bash
   npm start
   ```

## Uso / Documentação Swagger

Visite a URL `/api-docs` para saber mais sobre os endpoints da API:

```bash
curl -X GET "http://localhost:3000/api-docs"
```

## Configuração do Docker (Opcional)

### Pré-requisitos

Certifique-se de que o Docker está instalado em sua máquina. Você pode baixar e instalar o Docker a partir do [site oficial do Docker](https://www.docker.com/get-started).

### Configuração do Docker

1. **Construa a Imagem Docker**

   Execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t notion-habits-api .
   ```

   Este comando constrói a imagem Docker e a marca como `notion-habits-api`.
   <br>

2. **Execute o Container Docker**

   Execute o seguinte comando para iniciar um container a partir da imagem construída:

   ```bash
   docker run -p 8080:8080 --env-file .env my-notion-habits-api
   ```

   - `-p 8080:8080` mapeia a porta `8080` do container para a porta `8080` no seu host.
   - `--env-file .env` carrega variáveis de ambiente do arquivo `.env`.
   - `my-notion-habits-api` é o nome da imagem Docker.
