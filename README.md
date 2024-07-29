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

## Uso

Acesse a URL `/api/habit?habitName=Exercise` onde `habitName` é o nome do hábito:

```bash
curl -X GET "http://localhost:3000/api/habit?habitName=Exercise"
```

## Estrutura do Projeto

- `src/`
  - `controllers/`
    - `habitController.ts`: Lógica dos controladores.
  - `services/`
    - `notionService.ts`: Funções para interagir com a API do Notion.
  - `routes/`
    - `habitRoutes.ts`: Definição das rotas.
  - `app.ts`: Configuração do aplicativo Express.
  - `server.ts`: Configuração do servidor.
  - `config/`
    - `notionFields.ts`: Campos fixos do banco de dados do Notion.

## Contribuição

Sinta-se à vontade para contribuir com o projeto através de pull requests.
